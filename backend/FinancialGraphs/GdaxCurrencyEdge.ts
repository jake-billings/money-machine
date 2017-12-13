import {CurrencyEdge} from "./CurrencyEdge";
import {GdaxStream} from "../Data/GdaxStream";
import {CurrencyVertex} from "./CurrencyVertex";
import {gdaxStream} from "../Server/ExampleModel";

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
     * Gdax only offers markets in ETHUSD form with crypto first and USD later;
     * Our edges need to represent ETHUSD and USDETH. Invert is used to query the
     * market that exists, then we simply take the inverse to get the exchange
     * rate in the opposite direction.
     */
    private invert: boolean;

    constructor(to: CurrencyVertex, from: CurrencyVertex, gdaxStream: GdaxStream, invert: boolean) {
        //Make the edge id
        let id = 'GDAX-STREAM-' + to.getCurrency().getSymbol() + '-' + from.getCurrency().getSymbol();

        //Make the default label
        // This will only be used until the gdaxStream loads and provides
        // us with rate data (see getLabel())
        let label = to.getCurrency().getSymbol() + '-' + from.getCurrency().getSymbol();

        //Call super
        super(to, from, id, label);

        //Initialize property
        this.gdaxStream = gdaxStream;
        this.invert = invert;

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
     * @param {number} volumeBps The trade volume to search the GDAX order book for in bps
     * @returns {number} the exchange rate of this edge in bps
     */
    public getRateBps(volumeBps: number): number {
        //Case to and from to CurrencyVertex; see constructor
        let to = this.getTo() as CurrencyVertex; //See constructor (We only accept CurrencyVertices)
        let from = this.getFrom() as CurrencyVertex; //See constructor (We only accept CurrencyVertices)

        //todo double check this VERY important
        if (this.invert) {
            return 1 / (this.gdaxStream.getLowestAskBpsForVolume(this.productId, volumeBps) / 10000) * 10000;
        } else {
            return this.gdaxStream.getHighestBidBpsForVolume(this.productId, volumeBps);
        }
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
            let rateBps = this.getRateBps(100); //Get bps for a small volume
            let rateStr;
            if (rateBps < 10000) {
                rateStr = '1/' + (10000 / rateBps).toFixed(3).toString();
            } else {
                rateStr = (rateBps / 10000).toFixed(3).toString();
            }
            return rateStr;
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
        return 0;
    }

    public getFeeFromProportionalBps(): number {
        return 0;
    }
}