import {Serializable} from "../Serializable";

/**
 * Vertex
 *
 * Serializable
 *
 * Represents a vertex in a Graph object
 *
 * See Edge, Graph
 */
export abstract class Vertex implements Serializable {
    public abstract getId() : string;
    public abstract getLabel() : string;
    public abstract serialize() : object;
}