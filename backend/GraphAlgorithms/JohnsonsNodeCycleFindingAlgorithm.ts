import {BasicGraph} from "../BasicGraphs/BasicGraph";
import {Graph} from "../Graphs/Graph";
import {Vertex} from "../Graphs/Vertex";
import {Algorithm} from "../Algorithms/Algorithm";
import {GraphAlgorithm} from "./GraphAlgorithm";
import {GraphCircuitConversionAlgorithm} from "./GraphCircuitConversionAlgorithm";

/**
 * JohnsonsCycleFindingAlgorithm
 *
 * Implementation of Donald Johnson's algorithm for finding all cycles in a directed graph.
 *
 * This particular implementation accepts a node and returns all cycles for that node.
 *
 * This was really hard.
 */
export class JohnsonsNodeCycleFindingAlgorithm extends GraphCircuitConversionAlgorithm {
    constructor() {
        super('Johnson\'s Elementary Circuit Algorithm', 'O(n*e*(c+1))')
    }

    /**
     * complexityEstimate()
     *
     * Return n^3 because our algorithm complexity is O(n*e*(c+1))
     *
     * @param {number} n the number of vertices to guess complexity for
     * @returns {number} n^3 - the complexity estimate
     */
    public complexityEstimate(n: number): number {
        return n * n * n;
    }

    /**
     * findPaths()
     *
     * Return all subgraphs that are cycles in Graph g that start on vertext start using Johnson's algorithm.
     *
     * Citation: Johnson, Donald. "FINDING ALL THE ELEMENTARY CIRCUITS OF A DIRECTED GRAPH." Siam J. Comput.
     *           Vol 4, No. 1, March 1975
     *           http://www.cs.tufts.edu/comp/150GA/homeworks/hw1/Johnson%2075.PDF
     *
     * @param {Graph} g the graph to search for cycles in
     * @param {Vertex} start the vertex to start on
     * @returns {Array<BasicGraph>} the cycles found in graph g
     */
    public findPaths(g: Graph, start: Vertex): Array<BasicGraph> {
        //Circuit-Finding Algorithm

        //if Ak is not the empty set
        // If the the graph is empty, it contains no paths
        if ((g.getVertices().length < 1) || (g.getEdges().length < 1)) return [];

        //Initialize an array to store the circuits
        let circuits = [];

        //S is the node index to check. We accept a vertex object, so we must convert it to an index
        //s:=l;
        //s := least vertex in V; (ignore?)
        // s = V[0];
        let s = g.getVertices().indexOf(start);

        if (s<0) throw new Error('start vertex must be contained in graph in order to search for cycles');

        //integer list array A(n), B(n); logical array blocked (n); integer s;
        let A: Array<Array<number>>; //2d array int[k][n]
        let B: Array<Array<number>>; //1d array int[n]
        let blocked: Array<boolean>; //1d array boolean[n]

        //Construct A,V according to Johnson's modified adjacency matrix representation
        A = [];
        B = [];
        let V = [];

        //Initialize other values from Johnson's paper
        blocked = [];
        let stack = [];
        let n = g.getVertices().length; //Number of vertices

        //A:= adjacency structure of strong component K with least
        //vertex in subgraph of G induced by {s, s+ 1, n};

        for (let i = 0; i < g.getVertices().length; i++) {
            A.push([]);
            B.push([]);
            V.push(i);

            for (let j = 0; j < g.getVertices().length; j++) {
                let val = 0;

                g.getEdges().forEach(edge => {
                    if ((edge.getTo().getId() === g.getVertices()[i].getId())
                        && edge.getFrom().getId() === g.getVertices()[j].getId()) {
                        A[i].push(j);
                    }
                });

            }
        }

        //logical procedure CIRCUIT (integer value v);
        function circuit(v: number): boolean {

            //begin logical f;
            let f: boolean;

            //procedure UNBLOCK (integer value u);
            function unblock(u: number) {
                //blocked (u):= false;
                blocked[u] = false;

                //for w in B(u) do
                B[u].forEach(w => {
                    if (blocked[w]) unblock(w);
                });
                B[u] = []
            } //end UNBLOCK

            //f:= false;
            f = false;

            //stack v;
            stack.push(v);

            //blocked(v):= true;
            blocked[v] = true;

            //L1: for wAK(v) do
            A[v].forEach(w => {
                if (w === s) {
                    //if w=s then
                    circuits.push(stack.slice(0)); //Slice to clone the slack so it isn't modified later

                    //f := true;
                    f = true;

                } else if (!blocked[w]) {
                    //else if --blocked(w)
                    //if CIRCUIT(w)then f := true;
                    if (circuit(w)) {
                        f = true;
                    }
                }
            });

            if (f) {
                //L2: if f then UNBLOCK(v)
                unblock(v);
            } else {
                //else for w in Ak(v) do
                A[v].forEach(w => {
                    if (B[w].indexOf(v) < 0) {
                        B[w].push(v);
                    }
                });
            }

            //unstack v;
            stack.pop();

            //CIRCUIT := f;
            return f;

        } //end CIRCUIT;

        //empty stack;
        stack = [];

        //for i in Vk do
        //i=0
        for (let i = 0; i < n; i++) {
            //blocked(i) := false;
            blocked[i] = false;

            //B(i) := empty set;
            B[i] = [];
        }

        //L3: dummy := CIRCUIT(s);
        circuit(s);

        //Finally, convert the cycle arrays from node index arrays to Graph objects
        return circuits.map(circuit => {
            return this.convertFromCircuitToGraph(circuit, g)
        });
    }
}