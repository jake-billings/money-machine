import {Graph} from "../Graphs/Graph";
import {CurrencyEdge} from "./CurrencyEdge";
import {CurrencyVertex} from "./CurrencyVertex";

/**
 * FinancialGraph
 *
 * FinancialGraph is a specialized form of graph that ensures all
 * types are the financial kind.
 *
 * E.g. Vertecies are ALWAYS CurrencyVertex
 */
export class FinancialGraph extends Graph {
    constructor(vertices: Array<CurrencyVertex>, edges: Array<CurrencyEdge>) {
        super(vertices, edges);
    }

    public upsertVertex(v: CurrencyVertex) {
        return super.upsertVertex(v);
    }
    public upsertEdge(e: CurrencyEdge) {
        return super.upsertEdge(e);
    }
    public containsVertex(v: CurrencyVertex) {
        return super.containsVertex(v);
    }
    public containsEdge(v: CurrencyEdge) {
        return super.containsEdge(v);
    }

    public getEdges(): Array<CurrencyEdge> {
        return super.getEdges() as Array<CurrencyEdge>;
    }
    public getVertices(): Array<CurrencyVertex> {
        return super.getVertices() as Array<CurrencyVertex>;
    }
}