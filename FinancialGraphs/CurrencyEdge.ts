import {Edge} from "../Graphs/Edge";
import {CurrencyVertex} from "./CurrencyVertex";

export class CurrencyEdge extends Edge {
    private id: string;
    private label: string;
    private rateBps: number;
    private feeToBps: number;
    private feeFromBps: number;
    private feeToProportionalBps: number;
    private feeFromProportionalBps: number;
    private timeEstimateSec: number;
    private online: boolean;

    constructor(to: CurrencyVertex,
                from: CurrencyVertex,
                id: string,
                label: string,
                rateBps: number,
                feeToBps: number,
                feeFromBps: number,
                feeToProportionalBps: number,
                feeFromProportionalBps: number,
                timeEstimateSec: number,
                online: boolean) {
        super(to, from);
        this.id = id;
        this.label = label;
        this.rateBps = rateBps;
        this.feeToBps = feeToBps;
        this.feeFromBps = feeFromBps;
        this.feeToProportionalBps = feeToProportionalBps;
        this.feeFromProportionalBps = feeFromProportionalBps;
        this.timeEstimateSec = timeEstimateSec;
        this.online = online;
    }

    public getId() {
        return this.id;
    }

    public getLabel() {
        return this.label;
    }

    public getRateBps(): number {
        return this.rateBps;
    }

    public getFeeToBps(): number {
        return this.feeToBps;
    }

    public getFeeFromBps(): number {
        return this.feeFromBps;
    }

    public getFeeToProportionalBps(): number {
        return this.feeToProportionalBps;
    }

    public getFeeFromProportionalBps(): number {
        return this.feeFromProportionalBps;
    }

    public getTimeEstimateSec(): number {
        return this.timeEstimateSec;
    }

    public isOnline(): boolean {
        return this.online;
    }
}