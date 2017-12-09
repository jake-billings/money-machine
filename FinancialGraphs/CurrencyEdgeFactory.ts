/**
 * Created by jakebillings on 12/7/17.
 */
import {CurrencyVertex} from "./CurrencyVertex";
import {CurrencyEdge} from "./CurrencyEdge";

export abstract class CurrencyEdgeFactory {
    private to: CurrencyVertex;
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