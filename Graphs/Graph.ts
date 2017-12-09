import {Edge} from "./Edge"
import {Vertex} from "./Vertex"
import {Serializable} from "../Serializable";

/**
 * Graph
 *
 * Serializable
 *
 * Represents a Graph Object with an array of edges and an array of vertices
 *
 * Contains a few utility methods for managing the contents of the graph
 *
 * See Edge, Vertex, GraphAlgorithm
 */
export class Graph implements Serializable {
    /**
     * edges
     *
     * An array of all of the Edge objects in the graph
     */
    private edges: Array<Edge>;

    /**
     * vertices
     *
     * An array of all of the Vertex objects in the graph
     */
    private vertices: Array<Vertex>;

    /**
     * upsertVertex
     *
     * upserts a vertex into the graph
     *
     * O(n) complexity where n=|vertices|
     *
     * Checks through all vertices; replaces if a matching id is found; appends to the array if not.
     *
     * For instance, the first call with a given vertex will push() it onto the vertex array.
     * The second call will just update it in place.
     *
     * @param {Vertex} v The vertex to upsert
     */
    public upsertVertex(v: Vertex) {
        for (let i = 0; i<this.vertices.length; i++) {
            if (this.vertices[i].getId() === v.getId()) {
                this.vertices[i] = v;
                return;
            }
        }
        this.vertices.push(v);
    }

    /**
     * upsertEdge
     *
     * upserts an edge into the graph
     *
     * O(n) complexity where n=|edges|
     *
     * Checks through all edges; replaces if a matching id is found; appends to the array if not.
     *
     * For instance, the first call with a given edge will push() it onto the edges array.
     * The second call will just update it in place.
     *
     * @param {Edge} e The edge to upsert
     */
    public upsertEdge(e: Edge) {
        for (let i = 0; i<this.edges.length; i++) {
            if (this.edges[i].getId() === e.getId()) {
                this.edges[i] = e;
                return;
            }
        }
        this.edges.push(e);
    }

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

    public serialize() : object {
        return {
            vertices: this.vertices.map(node=>node.serialize()),
            edges: this.edges.map(edge=>edge.serialize())
        }
    }
}