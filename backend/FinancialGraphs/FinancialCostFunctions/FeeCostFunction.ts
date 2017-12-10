import {CostFunction} from "../../GraphAlgorithms/CostFunctions/CostFunction";
import {CurrencyEdge} from "../CurrencyEdge";

/**
 * FeeCostFunction
 *
 * Returns the fee cost of an edge as its cost function
 */
export class FeeCostFunction implements CostFunction {
    /**
     * amountBps
     *
     * The amount of money to calculate fee cost with;
     * Some fees are proportional to transaction size, so
     * this amount is required
     *
     * Example: $1,000 -> 10,000,000 pips (USD bps)
     */
    private amountBps: number;

    /**
     * getEdgeCost()
     *
     * Returns the time cost of an edge as its cost function
     *
     * @param {CurrencyEdge} e the edge to consider
     * @returns {number} e.getTimeEstimateSec()
     */
    public getEdgeCost(e: CurrencyEdge) : number {
        return e.calculateEdgeOutcome(this.getAmountBps());
    }

    constructor(amountBps: number) {
        this.amountBps = amountBps;
    }

    public getAmountBps() : number {
        return this.amountBps;
    }
}