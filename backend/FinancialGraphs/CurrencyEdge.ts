import {Edge} from "../Graphs/Edge";
import {CurrencyVertex} from "./CurrencyVertex";

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
export abstract class CurrencyEdge extends Edge {
    /**
     * id
     *
     * Unique id for the CurrencyEdge; usually generated by the factory and somewhat human-readable
     *
     * Example: ETH-USD-Kraken
     */
    private id: string;

    /**
     * label
     *
     * The label to display when rendering the edge to a user
     *
     * Examples: "ACD" or "15999 BTCUSD"
     */
    private label: string;

    /**
     * calculateEdgeOutcome()
     *
     * Calculates the outcome of a transaction over this edge
     *
     * @param {number} amountBps The amount of money to calculate fee cost with;
     *                        Some fees are proportional to transaction size, so
     *                        this amount is required
     *                        in BPS
     *                        for instance, if it's dollars, this is pips (USD bps)
     *                        $1,000 = 10,000,000 pips (USD bps)
     */
    public calculateEdgeOutcome(amountBps: number) {
        let runningTotalBps = amountBps;

        //Apply flat from fee
        runningTotalBps -= this.getFeeFromBps();

        //Apply rate conversion
        runningTotalBps *= this.getRateBps(runningTotalBps) / 10000;

        //Apply from spread
        runningTotalBps -= runningTotalBps * this.getFeeFromProportionalBps() / 10000;

        //Apply to spread
        runningTotalBps -= runningTotalBps * this.getFeeToProportionalBps() / 10000;

        //Apply flat to fee
        runningTotalBps -= this.getFeeToBps();


        return runningTotalBps;
    }

    constructor(to: CurrencyVertex,
                from: CurrencyVertex,
                id: string,
                label: string) {
        super(to, from);
        this.id = id;
        this.label = label;
    }

    public getId() {
        return this.id;
    }

    public getLabel() {
        return this.label;
    }

    public abstract getRateBps(volumeBps: number): number;

    public abstract getFeeToBps(): number;

    public abstract getFeeFromBps(): number;

    public abstract getFeeToProportionalBps(): number;

    public abstract getFeeFromProportionalBps(): number;

    public abstract getTimeEstimateSec(): number;

    public abstract isOnline(): boolean;
}