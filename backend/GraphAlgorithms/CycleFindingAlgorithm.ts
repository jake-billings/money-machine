import {Graph} from "../Graphs/Graph";
import {Vertex} from "../Graphs/Vertex";
import {BasicGraph} from "../BasicGraphs/BasicGraph";

export interface CycleFindingAlgorithm {
    /**
     * findPaths()
     *
     * Return all subgraphs that are cycles in Graph g
     *
     * Example: Johnson's algorithm (JohnsonsNodeCycleFindingAlgorithm)
     *
     * @param {Graph} g the graph to search for cycles in
     * @returns {Array<BasicGraph>} the cycles found in graph g
     */
    findPaths(g: Graph): Array<BasicGraph>;

    /**
     * getName()
     *
     * Returns the name of the cycle-finding algorithm; should be implemented by Algorithm superclass
     *
     * @returns {string} the name of the algorithm
     */
    getName() : string;
}