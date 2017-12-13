import {CurrencyEdge} from "./CurrencyEdge";
import {GdaxStream} from "../Data/GdaxStream";
import {CurrencyVertex} from "./CurrencyVertex";
import {gdaxStream} from "../Server/ExampleModel";
import {TradeResult} from "../Trading/TradeResult";

/**
 * GdaxCurrencyEdge
 *
 * GdaxCurrencyEdge is an implementation of CurrencyEdge that pulls all of its data from a cached GdaxStream
 * object.
 *
 * See CurrencyEdge
 */
export class GdaxCurrencyEdge extends CurrencyEdge {
    /**
     * gdaxStream
     *
     * The GdaxStream object that the edge will use to query its rate data
     */
    private gdaxStream: GdaxStream;

    /**
     * productId
     *
     * The product id of the market on the GDAX exchange
     *
     * Initialized in constructor
     */
    private productId: string;

    /**
     * invert
     *
     * INVERT IS TRUE IF THE TRADE IS CONSIDERED A BUY
     *
     * Gdax only offers markets in ETHUSD form with crypto first and USD later;
     * Our edges need to represent ETHUSD and USDETH. Invert is used to query the
     * market that exists, then we simply take the inverse to get the exchange
     * rate in the opposite direction.
     */
    private invert: boolean;

    constructor(from: CurrencyVertex, to: CurrencyVertex, gdaxStream: GdaxStream, invert: boolean) {
        //Make the edge id
        let id = 'GDAX-STREAM-' + to.getCurrency().getSymbol() + '-' + from.getCurrency().getSymbol();

        //Make the default label
        // This will only be used until the gdaxStream loads and provides
        // us with rate data (see getLabel())
        let label = to.getCurrency().getSymbol() + '-' + from.getCurrency().getSymbol();

        //Call super
        super(from, to, id, label);

        //Initialize property
        this.gdaxStream = gdaxStream;
        this.invert = invert;

        //Consider our usdEth
        //from usd to eth
        //thats the ETHUSD market on GDAX (we're backwards in our language), which doesn't need to be inverted
        //so, we don't invert values, but we do invert the symbol so we get eth-usd for gdax
        //See this.invert
        // Sometimes, we need to switch the product id to query the proper GDAX market
        if (invert) {
            this.productId = from.getCurrency().getSymbol() + '-' + to.getCurrency().getSymbol();
        } else {
            this.productId = to.getCurrency().getSymbol() + '-' + from.getCurrency().getSymbol();
        }
    }

    /**
     * getRateBps()
     *
     * Return the exchange rate from the GdaxStream market for a given volume
     *
     * @param {number} volumeBps The trade volume to search the GDAX order book for in bps in terms of the start asset
     * @returns {number} the exchange rate of this edge in bps
     */
    public getRateBps(volumeBps: number): number {
        //Consider our usdEth
        //from usd to eth
        //thats the ETHUSD market on GDAX (we're backwards in our language), which doesn't need to be inverted
        //so, invert is false because the values don't invert, and the symbol is already inverted,
        //so else executed and we just return the gdax value. Since on the ethusd gdax market,
        //usd->eth is considered a buy, we are looking for the lowest ask.
        //consider our ethusd
        //that's from eth to usd
        //on gdax, it's still the ETHUSD market. Now it's considered a sell, so we want the highest bid
        //however, they give prices in usd, so we have to invert the value
        //todo double check this VERY important
        // let name = this.getFrom().getCurrency().getSymbol() + '->' + this.getTo().getCurrency().getSymbol() + ' at ' + volumeBps / 10000;

        if (this.invert) {
            return this.gdaxStream.getLowestAskBpsForVolumeInFromCurrency(this.productId, volumeBps);
        } else {
            return 1 / (this.gdaxStream.getHighestBidBpsForVolumeInFromCurrency(this.productId, volumeBps) / 10000) * 10000;
        }
    }


    /**
     * executeAuthorizedTrade()
     *
     * Executes a trade along this edge at the exchange. This should NEVER be invoked directly. Always use
     * executeTrade() and a TradeAuthroizer to prevent mistakes.
     *
     * WARNING: this is not for the faint of heart.
     *
     * WARNING: DO NOT INVOKE DIRECTLY; USE executeTrade() and TradeAuthorizer
     *
     * This will execute a trade using real money. There should be safety in place around this method.
     *
     * @param {number} amountBps The size of the trade to make
     * @returns Promise<TradeResult> A promise of a TradeResult object representing the completed trade
     */
    protected executeAuthorizedTrade(amountBps: number) : Promise<TradeResult> {
        //todo implement a real trade lmao
        return new Promise(((resolve, reject) => {
            let result = new TradeResult(
                new Date(),
                this,
                amountBps,
                this.calculateEdgeOutcome(amountBps)
            );
            console.log('executing simulated trade on Gdax')
            return resolve(result);
        }));
    }

    /**
     * isOnline()
     *
     * Returns true if the gdaxStream is online and has loaded the order book needed
     * for this edge
     *
     * @returns {boolean} if the edge is online
     */
    public isOnline(): boolean {
        return gdaxStream.isConnected() && gdaxStream.hasOrderBook(this.productId);
    }

    /**
     * getLabel()
     *
     * If the edge is online, return the exchange rate as the label. If not, call super() to return
     * the default echange label.
     *
     * @returns {string} the label users should see on the rendered financial graph
     */
    public getLabel(): string {
        if (this.isOnline()) {
            let rateBps = this.getRateBps(1000); //Get bps for a small volume
            let rateStr;
            if (rateBps < 10000) {
                rateStr = '1/' + (10000 / rateBps).toFixed(3).toString();
            } else {
                rateStr = (rateBps / 10000).toFixed(3).toString();
            }
            return this.getFrom().getCurrency().getSymbol() + this.getTo().getCurrency().getSymbol() + '@' + rateStr;
        }
        return super.getLabel();
    }

    /**
     * getTimeEstimateSec()
     *
     * @returns {number} the estimated time to complete a GDAX market trade
     */
    public getTimeEstimateSec(): number {
        return 5; //Estimate five seconds
    }

    //Getters and setters
    public getFeeToBps(): number {
        return 0;
    }

    public getFeeFromBps(): number {
        return 0;
    }

    public getFeeToProportionalBps(): number {
        return 25;
    }

    public getFeeFromProportionalBps(): number {
        return 0;
    }
}