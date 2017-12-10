import {CostFunction} from "../../GraphAlgorithms/CostFunctions/CostFunction";
import {CurrencyEdge} from "../CurrencyEdge";

/**
 * TimeCostFunction
 *
 * Returns the time cost of an edge as its cost function
 */
export class TimeCostFunction implements CostFunction {
    /**
     * getEdgeCost()
     *
     * Returns the time cost of an edge as its cost function
     *
     * @param {CurrencyEdge} e the edge to consider
     * @returns {number} e.getTimeEstimateSec()
     */
    public getEdgeCost(e: CurrencyEdge) {
        return e.getTimeEstimateSec();
    }
}