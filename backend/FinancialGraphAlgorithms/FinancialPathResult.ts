import {Serializable} from "../Serializable";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {Currency} from "../Currencies/Currency";
import {FinancialPathResultFitnessFunction} from "./FinancialPathResultFitnessFunction";

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
    private startCurrency: Currency;
    private endCurrency: Currency;
    private fitness: number;

    constructor(name: string, path: FinancialGraph, startBps: number, endBps: number, timeSec: number, startCurrency: Currency, endCurrency: Currency, fitnessFunction: FinancialPathResultFitnessFunction) {
        this.name = name;
        this.path = path;
        this.startBps = startBps;
        this.endBps = endBps;
        this.timeSec = timeSec;
        this.startCurrency = startCurrency;
        this.endCurrency = endCurrency;
        this.fitness = fitnessFunction.getFitness(this);
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
    public getStartCurrency() : Currency {
        return this.startCurrency;
    }
    public getEndCurrency() : Currency {
        return this.endCurrency;
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
            startCurrency: this.getStartCurrency().serialize(),
            endCurrency: this.getEndCurrency().serialize(),
        }
    }
}