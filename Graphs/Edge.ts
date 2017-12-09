/**
 * Created by jakebillings on 12/7/17.
 */
import {Vertex} from "./Vertex";
import {Serializable} from "../Serializable";

export abstract class Edge implements Serializable {
    private to: Vertex;
    private from: Vertex;

    public abstract getId(): string;
    public abstract getLabel(): string;

    constructor(to: Vertex, from: Vertex) {
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