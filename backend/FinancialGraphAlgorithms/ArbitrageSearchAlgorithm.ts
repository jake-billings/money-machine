import {FinancialGraphAlgorithm} from "./FinancialGraphAlgorithm";
import {BasicGraph} from "../BasicGraphs/BasicGraph";
import {Graph} from "../Graphs/Graph";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {FinancialPathResult} from "./FinancialPathResult";

/**
 * ArbitrageSearchAlgorithm
 *
 * The ArbitrageSearchAlgorithm searches a financial graph for opportunities to extract value from the market
 * using cost simulation and cycle analysis.
 */
export abstract class ArbitrageSearchAlgorithm extends FinancialGraphAlgorithm {

    /**
     * findPaths()
     *
     * Finds all subgraphs in parent graph g where money can be made through arbitrage.
     *
     * @param {Graph} g the parent graph; this is your financial model (see ExampleModel)
     * @returns {Array<FinancialPathResult>} All paths where money can be made in the financial model
     */
    public abstract findPaths(g: FinancialGraph) : Array<FinancialPathResult>;

    /**
     * findBestPath()
     *
     * Finds the highest ranked of all subgraphs in parent graph g where money can be made through arbitrage.
     *
     * @param {Graph} g the parent graph; this is your financial model (see ExampleModel)
     * @returns {FinancialPathResult} All paths where money can be made in the financial model
     */
    public abstract findBestPath(g: FinancialGraph) : FinancialPathResult;
}