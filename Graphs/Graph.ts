import {Edge} from "./Edge"
import {Vertex} from "./Vertex"
import {Serializable} from "../Serializable";

export class Graph implements Serializable {
    private edges: Array<Edge>;
    private vertices: Array<Vertex>;

    constructor(vertices: Array<Vertex>, edges: Array<Edge>) {
        this.edges = edges;
        this.vertices = vertices;
    }

    public getEdges() {
        return this.edges;
    }

    public getVertices() {
        return this.vertices;
    }

    public upsertVertex(v: Vertex) {
        for (let i = 0; i<this.vertices.length; i++) {
            if (this.vertices[i].getId() === v.getId()) {
                this.vertices[i] = v;
                return;
            }
        }
        this.vertices.push(v);
    }

    public upsertEdge(e: Edge) {
        for (let i = 0; i<this.edges.length; i++) {
            if (this.edges[i].getId() === e.getId()) {
                this.edges[i] = e;
                return;
            }
        }
        this.edges.push(e);
    }

    public serialize() : object {
        return {
            vertices: this.vertices.map(node=>node.serialize()),
            edges: this.edges.map(edge=>edge.serialize())
        }
    }
}