import {Graph} from "../Graphs/Graph";
import {Algorithm} from "../Algorithms/Algorithm";
import {Vertex} from "../Graphs/Vertex";

/**
 * PathFindingAlgorithm
 *
 * Superclass to any algorithm that finds a path in a graph
 * E.g. shortest path algorithms like Dijkstra's
 */
export abstract class PathFindingAlgorithm extends Algorithm {
    /**
     * findPath()
     *
     * Execute the algorithm in order to find the path from "from" to "to" in the graph.
     *
     * Specifics are determined by the subclass. For instance, it
     * could be the shortest or lowest-cost path.
     *
     * Should throw an error if to is not in g or if from is not in g.
     *
     * @param {Vertex} to target vertex; the path will end at this vertex.
     * @param {Vertex} from start vertex; the path will start at this vertex.
     * @param {Graph} g The graph to search for the path in
     * @returns {Graph} The subgraph that is the path the algorithm found
     */
    public abstract findPath(to: Vertex, from: Vertex, g: Graph): Graph;

    constructor(name: string, complexityOrder: string) {
        super(name, complexityOrder);
    }
}