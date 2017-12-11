import {Graph} from "../Graphs/Graph";
import {Vertex} from "../Graphs/Vertex";
import {CurrencyVertex} from "../FinancialGraphs/CurrencyVertex";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {FinancialPathSimulationAlgorithm} from "./FinancialPathSimulationAlgorithm";
import {FinancialPathResult} from "./FinancialPathResult";

/**
 * SimpleFinancialPathSimulation
 *
 * The SimpleFinancialPathSimulation takes a path (directed line graph) of financial nodes and simulates the expected
 * outcome if every transaction is performed.
 *
 * This class is marked simple because it is not an optimized implementation.
 */
export class SimpleFinancialPathSimulationAlgorithm extends FinancialPathSimulationAlgorithm {

    constructor() {
        super('Financial Path Simulation', '~O(n^2)');
    }

    /**
     * complexityEstimate()
     *
     * Return n because our algorithm complexity is ~O(n)
     *
     * todo improve this estimate
     *
     * @param {number} n^2 the number of vertices to guess complexity for
     * @returns {number} n^2 - the complexity estimate
     */
    public complexityEstimate(n: number): number {
        return n * n;
    }

    /**
     * calculateExpectedResult()
     *
     * The FinancialPathSimulation takes a path (directed line graph) of financial nodes and simulates the expected
     * outcome if every transaction is performed.
     *
     * Unoptimized
     *
     * @param {Graph} g the financial directed line graph to simulate transactions of
     * @param {Vertex} start the vertex in graph g to start at (the first node)
     * @param {number} startingAmountBps amount in starting currency of first node (e.g. USD -> pips (USD bps))
     * @returns {number} endingAmountBps the amount in ending currency at the last node (e.g. USD -> pips (USD bps))
     */
    public calculateExpectedResult(g: FinancialGraph, start: CurrencyVertex, startingAmountBps: number): FinancialPathResult {
        function findNextEdge(vertex) {
            for (let i = 0; i < g.getEdges().length; i++) {
                if (g.getEdges()[i].getFrom().getId() === vertex.getId()) {
                    return g.getEdges()[i];
                }
            }
            return null;
        }

        let runningTotalbps = startingAmountBps;
        let runningTotalSec = 0;

        let vertex = start;
        let edge;
        let count = 0;
        let names = [];//todo

        names.push(findNextEdge(vertex).getFrom().getLabel());
        while ((edge = findNextEdge(vertex)) && count < g.getEdges().length) {
            vertex = edge.getTo();
            names.push(edge.getTo().getLabel()); //todo
            runningTotalbps = edge.calculateEdgeOutcome(runningTotalbps);

            runningTotalSec += edge.getTimeEstimateSec();

            count++;
        }

        return new FinancialPathResult(
            names.join('->'),
            g,
            startingAmountBps,
            runningTotalbps,
            runningTotalSec,
            start.getCurrency(),
            vertex.getCurrency());
    }
}