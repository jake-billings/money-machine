import {Algorithm} from "../Algorithms/Algorithm";
import {BasicGraph} from "../BasicGraphs/BasicGraph";
import {Graph} from "../Graphs/Graph";

/**
 * GraphAlgorithm
 *
 * Superclass to all algorithms that need to convert arrays in the form
 *
 * [0,1,2,3] to graphs of form [(0,1),(1,2),(2,3),(3,0)]
 */
export abstract class GraphCircuitConversionAlgorithm extends Algorithm {
    protected convertFromCircuitToGraph(circuit: Array<number>, parent: Graph): Graph {
        let vertices = circuit.map(i => {
            return parent.getVertices()[i];
        });

        let edges = circuit.map((vertexIndex, circuitIndex) => {
            let nextVertexIndex = circuit[(circuitIndex + 1) % circuit.length];

            let to = parent.getVertices()[vertexIndex].getId();
            let from = parent.getVertices()[nextVertexIndex].getId();

            let edge;

            parent.getEdges().forEach(e => {
                if ((e.getTo().getId() == to) && (e.getFrom().getId() == from)) {
                    edge = e;
                }
            });

            if (!edge) throw Error('malformed id structure in Johnson cycle algorithm');

            return edge;
        });

        return new BasicGraph(vertices, edges);
    }
}