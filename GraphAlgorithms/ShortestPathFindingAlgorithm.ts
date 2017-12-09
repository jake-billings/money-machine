import {Graph} from "../Graphs/Graph";
import {PathFindingAlgorithm} from "./PathFindingAlgorithm";
import {CostFunction} from "./CostFunctions/CostFunction";
import {Vertex} from "../Graphs/Vertex";

/**
 * ShortestPathFindingAlgorithm
 *
 * Superclass to all algorithms that find the lowest-cost path through a graph.
 * Uses the interface CostFunction to abstract the process of determining cost per
 * edge. For instance, a CostFunction that returns 1 can be used to pretend that
 * edges have no weight. A CostFunction could also return some combination of transaction
 * fees and time for financial graphs.
 *
 * For instance, Dijkstra's algorithm should be a direct subclass.
 */
export abstract class ShortestPathFindingAlgorithm extends PathFindingAlgorithm {
    /**
     * costFunction
     *
     * CostFunction is used to abstract the process of determining cost per
     * edge. For instance, a CostFunction that returns 1 can be used to pretend that
     * edges have no weight. A CostFunction could also return some combination of transaction
     * fees and time for financial graphs.
     *
     * Example: Cost function that returns 1
     *   This results in an unweighted search.
     */
    private costFunction: CostFunction;


    /**
     * findPath()
     *
     * Execute the algorithm in order to find the path from "from" to "to" in the graph
     * with the lowest cost.
     *
     * Should throw an error if to is not in g or if from is not in g.
     * Should return null if no path exists.
     *
     * @param {Vertex} to target vertex; the path will end at this vertex.
     * @param {Vertex} from start vertex; the path will start at this vertex.
     * @param {Graph} g The graph to search for the path in
     * @returns {Graph} The subgraph that is the path the algorithm found
     */
    public abstract findPath(to: Vertex, from: Vertex, g: Graph): Graph;

    constructor(name: string, complexityOrder: string, costFunction: CostFunction) {
        super(name, complexityOrder);
        this.costFunction = costFunction;
    }
}