import {Edge} from "../../Graphs/Edge";

/**
 * CostFunction
 *
 * Implementations of CostFunction should evaluate the cost of an edge in a graph.
 *
 * See ShortestPathFindingAlgorithm
 */
export interface CostFunction {
    /**
     * Return the cost (a.k.a weight) of an edge for the purpose of finding the lowest-cost path in a graph.
     * @param {Edge} e The edge to evaluate
     */
    getEdgeCost(e: Edge);
}