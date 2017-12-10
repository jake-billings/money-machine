import {Serializable} from "../Serializable";

/**
 * Vertex
 *
 * Serializable
 *
 * Represents a vertex in a Graph object
 *
 * See Edge, Graph
 *
 * See test/BasicGraphs/BasicVertex.spec.ts for unit tests
 */
export abstract class Vertex implements Serializable {
    public abstract getId() : string;
    public abstract getLabel() : string;

    public serialize() : Object {
        return {
            id: this.getId(),
            label: this.getLabel()
        }
    }
}