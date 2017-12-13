import {FinancialGraphAlgorithm} from "./FinancialGraphAlgorithm";
import {BasicGraph} from "../BasicGraphs/BasicGraph";
import {Graph} from "../Graphs/Graph";
import {CycleFindingAlgorithm} from "../GraphAlgorithms/CycleFindingAlgorithm";
import {Vertex} from "../Graphs/Vertex";
import {CurrencyVertex} from "../FinancialGraphs/CurrencyVertex";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {FinancialPathResult} from "./FinancialPathResult";

/**
 * FinancialPathExecutionAlgorithm
 *
 * Superclass
 *
 * The FinancialPathExecutionAlgorithm takes a path (directed line graph) of financial nodes and executes the trades.
 *
 * This isn't for the faint of heart. If you give it a losing path, you will lose money.
 */
export abstract class FinancialPathExecutionAlgorithm extends FinancialGraphAlgorithm {
    /**
     * calculateExpectedResult()
     *
     * The FinancialPathSimulation takes a path (directed line graph) of financial nodes and simulates the expected
     * outcome if every transaction is performed.
     *
     * @param {Graph} g the financial directed line graph to run the transactions of
     * @param {Vertex} start the vertex in graph g to start at (the first node)
     * @param {number} startingAmountBps amount in starting currency of first node (e.g. USD -> pips (USD bps))
     * @returns {number} endingAmountBps the amount in ending currency at the last node (e.g. USD -> pips (USD bps))
     */
    public abstract execute(g: FinancialGraph, start: CurrencyVertex, startingAmountBps: number) : Promise<FinancialPathResult>;
}