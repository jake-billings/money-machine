import {Vertex} from "./Vertex";
import {Serializable} from "../Serializable";

/**
 * Edge
 *
 * Serializable
 *
 * Represents a directed edge in a Graph object by holding a to vertex and a from vertex
 *
 * See Vertex, Graph
 *
 * See test/BasicGraphs/BasicEdge.spec.ts for unit tests
 */
export abstract class Edge implements Serializable {
    /**
     * to
     *
     * The destination vertex
     */
    private to: Vertex;
    /**
     * from
     *
     * The source vertex
     */
    private from: Vertex;

    public abstract getId(): string;
    public abstract getLabel(): string;

    constructor(to: Vertex, from: Vertex) {
        if (!(to&&from)) {
            throw new Error('Both to and from must be non-null Vertex objects to create an edge. (!(to&&from))')
        }

        this.to = to;
        this.from = from;
    }

    public getTo(): Vertex {
        return this.to;
    }
    public getFrom(): Vertex {
        return this.from;
    }

    public serialize() : object {
        return {
            id: this.getId(),
            to: this.getTo().getId(),
            from: this.getFrom().getId(),
            label: this.getLabel()
        };
    }
}