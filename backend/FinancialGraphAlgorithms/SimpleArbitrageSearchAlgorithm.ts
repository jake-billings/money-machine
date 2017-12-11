import {BasicGraph} from "../BasicGraphs/BasicGraph";
import {Graph} from "../Graphs/Graph";
import {CycleFindingAlgorithm} from "../GraphAlgorithms/CycleFindingAlgorithm";
import {ArbitrageSearchAlgorithm} from "./ArbitrageSearchAlgorithm";
import {FinancialPathSimulationAlgorithm} from "./FinancialPathSimulationAlgorithm";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {FinancialPathResult} from "./FinancialPathResult";

/**
 * SimpleArbitrageSearchAlgorithm
 *
 * The SimpleArbitrageSearchAlgorithm searches a financial graph for opportunities to extract value from the market
 * using cost simulation and cycle analysis.
 */
export class SimpleArbitrageSearchAlgorithm extends ArbitrageSearchAlgorithm {
    /**
     * The cycle-finding algorithm is used to find all cycles in the graph.
     */
    private cycleFinder: CycleFindingAlgorithm;

    /**
     * The financial path simulation algorithm to use to check the outcome of each cycle we find
     */
    private financialPathSimulator: FinancialPathSimulationAlgorithm;

    constructor(cycleFinder: CycleFindingAlgorithm, financialPathSimulator: FinancialPathSimulationAlgorithm) {
        super(`Arbitrage Search Algorithm using ${cycleFinder.getName()} and ${financialPathSimulator.getName()}`, '~O(n^4)');
        this.cycleFinder = cycleFinder;
        this.financialPathSimulator = financialPathSimulator;
    }

    /**
     * complexityEstimate()
     *
     * Return n^4 because our algorithm complexity is ~O(n^4)
     *
     * todo improve this estimate
     *
     * @param {number} n the number of vertices to guess complexity for
     * @returns {number} n^4 - the complexity estimate
     */
    public complexityEstimate(n: number): number {
        return n * n * n * n;
    }

    /**
     * findPaths()
     *
     * Finds all subgraphs in parent graph g where money can be made through arbitrage.
     *
     * @param {Graph} g the parent graph; this is your financial model (see ExampleModel)
     * @returns {Array<BasicGraph>} All paths where money can be made in the financial model
     */
    public findPaths(g: FinancialGraph): Array<FinancialPathResult> {
        g.getEdges().forEach(edge => {
            if (!edge.isOnline()) throw new Error("All edges must be online to run arbitrage search algorithm.")
        });

        //Find cycles
        return (this.cycleFinder.findPaths(g) as Array<FinancialGraph>)
        //Simulate each cycle to get a result
            .map(path => {
                let startVertex = path.getVertices()[0];
                let startAmountBps = 50000000;
                return this.financialPathSimulator.calculateExpectedResult(path, startVertex, startAmountBps);
            })

            //Filter out the results that lose money
            .filter(result => {
                return result.getProfit() >= 0;
            })

            //Sort from high to low for good measure
            .sort((a, b) => {
                return b.getProfit() - a.getProfit();
            });
    }
}