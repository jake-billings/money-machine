import {Edge} from "../Graphs/Edge";
import {CurrencyVertex} from "./CurrencyVertex";
import {CurrencyEdge} from "./CurrencyEdge";

/**
 * CurrencyEdge
 *
 * CurrencyEdge is a directed edge in the financial graph that represents a way to move currency between currency nodes.
 * CurrencyEdge should hold all information about a potential transaction including rates and fees.
 * CurrencyEdges can be simple transfers or can be market exchange rates.
 *
 * See all subclasses.
 *
 * Examples: Bitcoin Transfer, ACH Transfer, BTCUSD Market
 */
export class BasicCurrencyEdge extends CurrencyEdge {
    /**
     * rateBps
     *
     * The exchange rate of the edge in basis points
     *
     * For transfers, this is always equal to 1 (10000 bps)
     * For markets, this is the market rate and should be updated by factory via
     * the exchange's API.
     *
     * Examples: 10000, 15000000
     */
    private rateBps: number;

    /**
     * feeToBps
     *
     * Flat rate fee applied to the destination currency
     *
     * For instance, on a BTC to USD transaction, a flat fee of $1.00 for selling BTC on a market
     * results in a value of 10000 pips (USD bps) in this field.
     *
     * For a free transfer, this field is 0.
     *
     * To calculate how much value this takes from a transaction, divide by 10000 and subtract from the
     * amount of destination currency.
     *
     * Examples: 10000, 0
     */
    private feeToBps: number;

    /**
     * feeFromBps
     *
     * Flat rate fee applied to the source currency
     *
     * For instance, on a BTC to USD transaction, a flat fee of 0.0001 BTC for selling BTC on a market
     * results in a value of 1 BTC bps in this field.
     *
     * To calculate how much value this takes from a transaction, divide by 10000 and subtract from the
     * amount of source currency.
     *
     * For a free transfer, this field is 0.
     *
     * Examples: 10000, 0
     */
    private feeFromBps: number;

    /**
     * feeToProportionalBps
     *
     * Proportional (or spread) fee applied to the destination currency
     *
     * For instance, on a BTC to USD transaction, a spread of 100 bps applied to the USD of the transaction
     * results in a value of 100 for this field.
     *
     * To calculate how much value this takes from a transaction, divide by 10000, multiply by the amount of destination
     * currency, and subtract the result.
     *
     * For a free transfer, this field is 0.
     *
     * Examples: 10000, 0
     */
    private feeToProportionalBps: number;

    /**
     * feeFromProportionalBps
     *
     * Proportional (or spread) fee applied to the source currency
     *
     * For instance, on a BTC to USD transaction, a spread of 100 bps applied to the USD of the transaction
     * results in a value of 100 for this field.
     *
     * To calculate how much value this takes from a transaction, divide by 10000, multiply by the amount of source
     * currency, and subtract the result.
     *
     * For a free transfer, this field is 0.
     *
     * Examples: 10000, 0
     */
    private feeFromProportionalBps: number;

    /**
     * timeEstimateSec
     *
     * This is a rough estimate of the amount of time it will take for a transaction on this edge to occur.
     *
     * For things like credit card swipes, this is likely ~10.
     * For bitcoin transactions, this is days or hours. ~18,000
     * For bank transfers, this could be days. ~250,000+
     */
    private timeEstimateSec: number;

    /**
     * online
     *
     * True if this edge is online. If an edge factory fails to load data for this edge, this property should be
     * set to false and all other values should be invalid.
     *
     * This should be true anytime an exchange rate is successfully loaded.
     */
    private online: boolean;

    constructor(to: CurrencyVertex,
                from: CurrencyVertex,
                id: string,
                label: string,
                rateBps: number,
                feeToBps: number,
                feeFromBps: number,
                feeToProportionalBps: number,
                feeFromProportionalBps: number,
                timeEstimateSec: number,
                online: boolean) {
        super(to, from, id, label);
        this.rateBps = rateBps;
        this.feeToBps = feeToBps;
        this.feeFromBps = feeFromBps;
        this.feeToProportionalBps = feeToProportionalBps;
        this.feeFromProportionalBps = feeFromProportionalBps;
        this.timeEstimateSec = timeEstimateSec;
        this.online = online;
    }

    public getRateBps(): number {
        return this.rateBps;
    }

    public getFeeToBps(): number {
        return this.feeToBps;
    }

    public getFeeFromBps(): number {
        return this.feeFromBps;
    }

    public getFeeToProportionalBps(): number {
        return this.feeToProportionalBps;
    }

    public getFeeFromProportionalBps(): number {
        return this.feeFromProportionalBps;
    }

    public getTimeEstimateSec(): number {
        return this.timeEstimateSec;
    }

    public isOnline(): boolean {
        return this.online;
    }
}