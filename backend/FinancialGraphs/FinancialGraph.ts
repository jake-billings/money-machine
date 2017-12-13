import {Graph} from "../Graphs/Graph";
import {CurrencyEdge} from "./CurrencyEdge";
import {CurrencyVertex} from "./CurrencyVertex";
import {Loader} from "../Data/Loader";

/**
 * FinancialGraph
 *
 * FinancialGraph is a specialized form of graph that ensures all
 * types are the financial kind.
 *
 * E.g. Vertecies are ALWAYS CurrencyVertex
 */
export class FinancialGraph extends Graph {
    /**
     * onLoadCallbacks
     *
     * A list of callbacks for when the graph loads
     */
    private onLoadCallbacks: Array<Function>;

    /**
     * constructor
     *
     * Important part:
     *
     * Registers ourselves as loaders. Every time one of the loaders we gets calls our onload callback,
     * we check if the whole graph is done loading. If it is, we fire all our onLoad callbacks and get
     * the party started.
     *
     * @param {Array<CurrencyVertex>} vertices See Graph
     * @param {Array<CurrencyEdge>} edges See Graph
     * @param {Array<Loader>} loaders loaders to register
     */
    constructor(vertices: Array<CurrencyVertex>, edges: Array<CurrencyEdge>, loaders: Array<Loader>) {
        super(vertices, edges);

        this.onLoadCallbacks = [];

        //Register ourselves as a listener for each loader we receive
        // Call fireOnLoadIfReady() each time a load completes. Hopefully,
        // we eventually call our own fireLoad function.
        loaders.forEach(loader => {
            loader.onLoad(() => {
                this.fireOnLoadIfReady();
            });
        });
    }

    /**
     * onLoad()
     *
     * Adds a function to a list of functions to be called back on once the graph loads
     *
     * @param {Function} callback no parameters; just a notification
     */
    public onLoad(callback: Function) {
        this.onLoadCallbacks.push(callback);
    }

    /**
     * fireOnLoadIfReady()
     *
     * fires all onload callbacks if all the edges in the graph are ready;
     *
     * Call this after each streamer loads.
     *
     * asynchronously calls callbacks
     *
     * @returns {boolean} true if onLoad was called
     */
    protected fireOnLoadIfReady() : boolean {
        let online = true;
        this.getEdges().forEach(edge => {
            if (!edge.isOnline()) online = false;
        });
        if (online) {
            this.onLoadCallbacks.forEach(callback => {
                return setTimeout(() => {
                    return callback();
                },0);
            });
            return true;
        }
        return false;
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