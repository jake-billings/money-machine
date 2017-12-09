import {ShortestPathFindingAlgorithm} from "./ShortestPathFindingAlgorithm";
import {CostFunction} from "./CostFunctions/CostFunction";
import {Vertex} from "../Graphs/Vertex";
import {Graph} from "../Graphs/Graph";

/**
 * DijikstrasShortestPathFindingAlgorithm
 *
 * Finds the lowest-cost path between to vertices in a graph.
 *
 * Singleton
 *
 * Algorithm class for Dijikstra's Algorithm
 */
export class DijikstrasShortestPathFindingAlgorithm extends ShortestPathFindingAlgorithm {
    /**
     * Initialize with the name Dijikstra's Algorithm and complexity O(n^s)
     * @param {CostFunction} costFunction
     */
    constructor(costFunction: CostFunction) {
        super('Dijikstra\'s Algorithm', 'O(n^2)', costFunction);
    }

    /**
     * complexityEstimate()
     *
     * Return n^2 because our complexity is O(n^2)
     *
     * @param {number} n the number of vertices to guess complexity for
     * @returns {number} n^2 - the complexity estimate
     */
    public complexityEstimate(n: number) {
        return n*n;
    }


    /**
     * findPath()
     *
     * Calculate the lowest-cost path between to and from in g and return the path.
     * Returns empty graph if no path exists.
     * Throws an error if to and from aren't in g.
     *
     * https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
     *
     * @param {Vertex} to
     * @param {Vertex} from
     * @param {Graph} g
     * @returns {Graph} The shortest path between to and from in g
     */
    public findPath(to: Vertex, from: Vertex, g: Graph): Graph {
        if (!(g.containsVertex(to)&&g.containsVertex(from))) {
            throw Error("to and from vertices must both be contained in g");
        }

        //Create vertex set Q
        // Unvisited nodes
        let Q = [];

        //Initialize arrays for distance and previous node in optimal path from source
        let dist = {};
        let prev = {};
        let neighbors = {};

        let target = to.getId();

        //Initialization
        g.getVertices().forEach(v => {
            dist[v.getId()] = Infinity;
            prev[v.getId()] = undefined;
            Q.push(v.getId());
        });

        //Distance from source to source is 0
        dist[from.getId()] = 0;

        //While Q is not empty
        while (Q.length > 0) {
            //Select the node with the smallest distance
            let I; //Node index
            let u; //Node id
            let minval = Infinity; //Node value; can't trust this as if we're using I=0, it could be wrong
            Q.forEach(function (q, i) {
                if (dist[q] < minval) {
                    minval = dist[q];
                    u = q;
                    I = i;
                }
            });

            //Remove u from Q
            Q.splice(I, 1);

            //Since we are only interested in the shortest path between source and target,
            // we can terminate the search after the splice if u == target
            if (u === target) {
                break;
            }

            //Dynamically generate the neighbors list for u
            if (!neighbors[u]) {
                neighbors[u] = g.getEdges()
                    .filter(edge => {
                    return edge.getFrom().getId() === u;
                });
            }
            //Update the neighbors list
            neighbors[u] = neighbors[u].filter(edge=>{
                return Q.indexOf(edge.getTo().getId()) >= 0;
            });

            //for each neighbor v (at edge.getFrom().getId()) of u where v is still in Q
            neighbors[u].forEach(edge => {
                let alt = dist[u] + 1; //this.getCostFunction().getEdgeCost(edge);
                let v = edge.getTo().getId();
                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = edge;
                }
            });


        }

        //Get the sequence via reverse iteration
        let u = target;

        let edges = [];
        let vertices = [];

        //Add the target vertex
        // The rest of the loop only adds source (from)
        // vertices.
        if (prev[u]) vertices.push(prev[u].getTo());

        // Construct the shortest path with a stack S
        while (prev[u]) {
            // Push the edge onto the stack
            edges.push(prev[u]);
            //Push the edge's source
            vertices.push(prev[u].getFrom());
            // Traverse from target to source
            u = prev[u].getFrom().getId();
        }

        return new Graph(vertices, edges);
    }
}