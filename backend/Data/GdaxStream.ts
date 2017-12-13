import * as WebSocket from 'ws';
import {Loader} from "./Loader";

/**
 * GDAX_WSS_URL
 *
 * @type {string} the URL of the gdax WebSocket api
 */
const GDAX_WSS_URL = 'wss://ws-feed.gdax.com';

/**
 * GdaxStream
 *
 * GdaxStream is a caching layer that accepts the updates from the gdax websocket
 * api and maintains an up-to-date order book.
 */
export class GdaxStream extends Loader {
    /**
     * ws
     *
     * the websocket connection to gdax
     */
    private ws: WebSocket;

    /**
     * orderBooks
     *
     * a basic object to store the cached order books from gdax
     *
     * format: {'ETH-USD':{...gdax snapshot...}}
     */
    private orderBooks: object;

    /**
     * tickers
     *
     * a basic object to store cached ticker information from gdax
     *
     * format: {'ETH-USD':{...gdax snapshot...}}
     */
    private tickers: object;

    /**
     * connected
     *
     * true if the gdax WebSocket is connected
     */
    private connected: boolean;

    /**
     * productIds
     *
     * the product ids that we subscribe to on gdax
     */
    private productIds: Array<string>;

    constructor(productIds: Array<string>) {
        super();

        //Start disconnected; this is set to true when the socket opens
        this.connected = false;

        //Init empty orderbook and ticker caches
        this.orderBooks = {};
        this.tickers = {};

        //Store the product ids we want
        this.productIds = productIds;

        //Connect to the GDAX WebSocket feed
        this.ws = new WebSocket(GDAX_WSS_URL, {
            perMessageDeflate: false
        });

        //Open the websocket connection to gdax
        this.ws.on('open', () => {
            //Log the connection
            console.log('Connected GdaxStream');

            //Set the connected flag on this class
            this.connected = true;

            //Send the subscribe request to websockets
            this.ws.send(JSON.stringify({
                type: 'subscribe',
                product_ids: this.productIds,
                channels: [
                    'level2',
                    'ticker'
                ]
            }));
        });

        //If the WebSocket closes, log it and store the state
        this.ws.on('close', () => {
            //Log the disconnect
            console.log('Disconnected GdaxStream');

            //Set the connected flag
            this.connected = false;
        });

        //When we get a message from gdax, process it
        this.ws.on('message', (raw) => {
            //Parse the json
            let data = JSON.parse(raw);

            //Call the appropriate method or log the error
            switch (data.type) {
                case 'snapshot':
                    this.acceptSnapshot(data);
                    break;
                case 'l2update':
                    this.acceptUpdate(data);
                    break;
                case 'ticker':
                    this.acceptTicker(data);
                    break;
                case 'error':
                    console.error('GDAX Error', data);
                    break;
                default:
                    console.warn('Unknown GDAX message', data.type);
            }
        });
    }

    /**
     * acceptSnapshot()
     *
     * Accepts a GDAX level2 snapshot
     *
     * @param snapshot
     */
    private acceptSnapshot(snapshot: any) {
        console.log('Received Level2 Snapshot from Gdax for ', snapshot.product_id);
        this.orderBooks[snapshot.product_id] = snapshot;
        this.fireOnLoadIfReady();
    }

    /**
     * acceptTicker()
     *
     * Accepts a GDAX ticker message
     *
     * @param ticker
     */
    private acceptTicker(ticker: any) {
        this.tickers[ticker.product_id] = ticker;
    }

    /**
     * acceptUpdate()
     *
     * Accepts a GDAX level2 update
     *
     * @param update
     */
    private acceptUpdate(update: any) {
        let book = this.orderBooks[update.product_id];
        update.changes.forEach(change => {
            //Find which side of the order book the update is for
            let side;
            if (change[0]=='buy') {
                side = book.bids;
            } else if (change[0]=='sell') {
                side = book.asks;
            } else {
                throw new Error('Unrecognized order book update in GdaxStream');
            }

            //Upsert the new orderbook volume at the given price
            let updated = false;
            side.forEach(priceVolTuple => {
                if (priceVolTuple[0]===change[1]) {
                    if (updated) {
                        throw new Error('Duplicate vol size in order book in GdaxStream') //should never happen
                    } else {
                        priceVolTuple[1] = change[2];
                        updated = true;

                    }
                }
            });
            if (!updated) {
                side.push([change[1], change[2]]);
            }
        });
    }

    /**
     * getLowestAskBpsForVolume()
     *
     * Major key; part of what makes us money
     *
     * This method finds the best available asking price on in a given GDAX order book
     *
     * @param {string} orderBook The GDAX productId of the order book to check
     * @param {number} volumeBps The volume in currency of the order book to search for asks for
     * @returns {number} the best price in currency bps
     */
    public getLowestAskBpsForVolume(orderBook: string, volumeBps: number): number {
        let lowestMatchingAskPriceBps = Infinity;

        this.orderBooks[orderBook].asks.forEach(ask => {
            let askPriceBps = parseFloat(ask[0])*10000;
            let askVolumeBps = parseFloat(ask[1])*10000;


            if ((askPriceBps < lowestMatchingAskPriceBps) && (askVolumeBps > volumeBps)) {
                lowestMatchingAskPriceBps = askPriceBps;
            }
        });

        return lowestMatchingAskPriceBps;
    }

    /**
     * getLowestAskBpsForVolumeInFromCurrency()
     *
     * Major key; part of what makes us money
     *
     * This method finds the best available asking price on in a given GDAX order book IN VOLUME OF THE "FROM" CURRENCY
     *
     * @param {string} orderBook The GDAX productId of the order book to check
     * @param {number} volumeInFromCurrencyBps The volume in the from currency of the order book to search for asks for
     * @returns {number} the best price in currency bps
     */
    public getLowestAskBpsForVolumeInFromCurrency(orderBook: string, volumeInFromCurrencyBps: number): number {
        let lowestMatchingAskPriceBps = Infinity;

        this.orderBooks[orderBook].asks.forEach(ask => {
            let askPriceBps = parseFloat(ask[0])*10000;
            let askVolumeInFromCurrencyBps = parseFloat(ask[0])*parseFloat(ask[1])*10000;


            if ((askPriceBps < lowestMatchingAskPriceBps) && (askVolumeInFromCurrencyBps > volumeInFromCurrencyBps)) {
                lowestMatchingAskPriceBps = askPriceBps;
            }
        });

        return lowestMatchingAskPriceBps;
    }

    /**
     * getHighestBidBpsForVolume()
     *
     * Major key; part of what makes us money
     *
     * This method finds the best available bidding price on in a given GDAX order book
     *
     * @param {string} orderBook The GDAX productId of the order book to check
     * @param {number} volumeBps The volume in currency of the order book to search for asks for
     * @returns {number} the best price in currency bps
     */
    public getHighestBidBpsForVolume(orderBook: string, volumeBps: number): number {
        let highestMatchingBidPriceBps = 0;

        this.orderBooks[orderBook].bids.forEach(bid => {
            let bidPriceBps = parseFloat(bid[0])*10000;
            let bidVolumeBps = parseFloat(bid[1])*10000;


            if ((bidPriceBps > highestMatchingBidPriceBps) && (bidVolumeBps > volumeBps)) {
                highestMatchingBidPriceBps = bidPriceBps;
            }
        });

        return highestMatchingBidPriceBps;
    }

    /**
     * getHighestBidBpsForVolumeInFromCurrency()
     *
     * Major key; part of what makes us money
     *
     * This method finds the best available bidding price on in a given GDAX order book IN VOLUME OF THE "FROM" CURRENCY
     *
     * @param {string} orderBook The GDAX productId of the order book to check
     * @param {number} volumeInFromCurrencyBps The volume in currency of the order book to search for asks for IN VOLUME OF THE "FROM" CURRENCY
     * @returns {number} the best price in currency bps
     */
    public getHighestBidBpsForVolumeInFromCurrency(orderBook: string, volumeInFromCurrencyBps: number): number {
        let highestMatchingBidPriceBps = 0;

        this.orderBooks[orderBook].bids.forEach(bid => {
            let bidPriceBps = parseFloat(bid[0])*10000;
            let bidVolumeInFromCurrencyBps = parseFloat(bid[0])*parseFloat(bid[1])*10000;


            if ((bidPriceBps > highestMatchingBidPriceBps) && (bidVolumeInFromCurrencyBps > volumeInFromCurrencyBps)) {
                highestMatchingBidPriceBps = bidPriceBps;
            }
        });

        return highestMatchingBidPriceBps;
    }

    /**
     * hasOrderBook()
     *
     * Checks if a given order book is loaded; true only if the order book has loaded
     *
     * @param {string} book The GDAX productId of the order book to check
     * @returns {boolean} true if we have an order book for the given product id
     */
    public hasOrderBook(book: string): boolean {
        return Object.keys(this.orderBooks).indexOf(book) >= 0;
    }

    /**
     * Fires onload callbacks if order book has loaded
     *
     * @returns {boolean} if callbacks were called
     */
    private fireOnLoadIfReady() : boolean {
        if (Object.keys(this.orderBooks).length !== this.productIds.length) return false;
        this.fireOnLoad();
        return true;
    }

    public isConnected(): boolean {
        return this.connected;
    }

    public getTickers(): object {
        return this.tickers;
    }
}
