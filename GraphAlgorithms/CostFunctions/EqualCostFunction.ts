import {CostFunction} from "./CostFunction";
import {Edge} from "../../Graphs/Edge"

/**
 * EqualCostFunction
 *
 * Implementation of CostFunction that always returns 1.
 * This is to be used as a cost function for ShortestPathFindingAlgorithms if edges have no weight.
 *
 * See CostFunction
 * See ShortestPathFindingAlgorithm
 */
export class EqualCostFunction implements CostFunction {
    /**
     * getEdgeCost()
     *
     * Returns 1
     * This is to be used as a cost function for ShortestPathFindingAlgorithms if edges have no weight
     * @param {Edge} e Edge to evaluate
     * @returns {number} 1
     */
   public getEdgeCost(e: Edge) {
       return 1;
   }
}