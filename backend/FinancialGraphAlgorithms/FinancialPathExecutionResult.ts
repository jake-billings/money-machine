import {FinancialPathResult} from "./FinancialPathResult";
import {TradeResult} from "./TradeResult";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {CurrencyVertex} from "../FinancialGraphs/CurrencyVertex";

/**
 * FinancialPathExecutionResult
 *
 * Results a completely executed financial path
 *
 * See FinancialPathExecutionAlgorithm, TradeResult
 */
export class FinancialPathExecutionResult extends FinancialPathResult {
    /**
     * tradeResults
     *
     * An array of trade results from each trade that was executed during this financial path
     */
    private tradeResults: Array<TradeResult>;

    constructor(name: string, path: FinancialGraph, startBps: number, endBps: number, timeSec: number, startVertex: CurrencyVertex, endVertex: CurrencyVertex, tradeResults: Array<TradeResult>) {
        super(name, path, startBps, endBps, timeSec, startVertex, endVertex, null);
        this.tradeResults = tradeResults;
    }

    public getTradeResults() {
        return this.tradeResults;
    }
}