import {Serializable} from "../Serializable";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {Currency} from "../Currencies/Currency";
import {FinancialPathResultFitnessFunction} from "./FinancialPathResultFitnessFunction";
import {CurrencyVertex} from "../FinancialGraphs/CurrencyVertex";

/**
 * FinancialPathResult
 *
 * FinancialPathResult this object holds one path of running an arbitrage search algorithm including the full
 *  path to profitability and the amount of profit gained.
 */
export class FinancialPathResult implements Serializable {
    private name: string;
    private path: FinancialGraph;
    private startBps: number;
    private endBps: number;
    private timeSec: number;
    private startVertex: CurrencyVertex;
    private endVertex: CurrencyVertex;
    private fitness: number;

    constructor(name: string, path: FinancialGraph, startBps: number, endBps: number, timeSec: number, startVertex: CurrencyVertex, endVertex: CurrencyVertex, fitnessFunction: FinancialPathResultFitnessFunction) {
        this.name = name;
        this.path = path;
        this.startBps = startBps;
        this.endBps = endBps;
        this.timeSec = timeSec;
        this.startVertex = startVertex;
        this.endVertex = endVertex;

        //Fitness function is optional rn todo
        if (fitnessFunction) {
            this.fitness = fitnessFunction.getFitness(this);
        }
    }

    public getPath() : FinancialGraph {
        return this.path;
    }
    public getName() : string {
        return this.name;
    }
    public getStartBps() : number {
        return this.startBps;
    }
    public getEndBps() : number {
        return this.endBps;
    }
    public getStartVertex() : CurrencyVertex {
        return this.startVertex;
    }
    public getEndVertex() : CurrencyVertex {
        return this.endVertex;
    }
    public getProfitBps() : number {
        return this.getEndBps() - this.getStartBps();
    }
    public getProfit() : number {
        return this.getProfitBps()/10000;
    }
    public getTimeSec() : number {
        return this.timeSec;
    }
    public getFitness() : number {
        return this.fitness;
    }

    public serialize() {
        return {
            name: this.getName(),
            startBps: this.getStartBps(),
            endBps: this.getEndBps(),
            profitBps: this.getProfitBps(),
            profit: this.getProfit(),
            fitness: this.getFitness(),
            timeSec: this.getTimeSec(),
            path: this.getPath().serialize(),
            startVertex: this.getStartVertex().serialize(),
            endVertex: this.getEndVertex().serialize(),
        }
    }
}