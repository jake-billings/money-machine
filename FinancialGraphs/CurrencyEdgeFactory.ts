/**
 * Created by jakebillings on 12/7/17.
 */
import {CurrencyVertex} from "./CurrencyVertex";
import {CurrencyEdge} from "./CurrencyEdge";

/**
 * CurrencyEdgeFactory
 *
 * Superclass for all factories of edges;
 *
 * EdgeFactories should handle all logic for the creation of edge types.
 * For instance, the GdaxEdgeFactory handles loading data from GDAX to populate the relevant CurrencyEdge
 * information.
 *
 * Has protected methods to generate each property of the edge.
 *
 * May be called multiple times in order to update the exchange price data in the financial graph
 */
export abstract class CurrencyEdgeFactory {
    /**
     * to
     *
     * The destination CurrencyVertex representing the destination of the transaction
     */
    private to: CurrencyVertex;
    /**
     * from
     *
     * The destination CurrencyVertex representing the source of the transaction
     */
    private from: CurrencyVertex;

    protected constructor(to: CurrencyVertex, from: CurrencyVertex) {
        this.to = to;
        this.from = from;
    }

    protected getTo(): CurrencyVertex {
        return this.to;
    }

    protected getFrom(): CurrencyVertex {
        return this.from;
    }

    protected abstract getId(): string;

    protected abstract getLabel(): string;

    protected abstract getRateBps(): Promise<number>;

    protected abstract getFeeToBps(): number;

    protected abstract getFeeFromBps(): number;

    protected abstract getFeeToProportionalBps(): number;

    protected abstract getFeeFromProportionalBps(): number;

    protected abstract getTimeEstimateSec(): number;

    public abstract getEdge(): Promise<CurrencyEdge>;
}