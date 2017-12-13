import {Graph} from "../Graphs/Graph";
import {Vertex} from "../Graphs/Vertex";
import {CurrencyVertex} from "../FinancialGraphs/CurrencyVertex";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";
import {FinancialPathResult} from "./FinancialPathResult";
import {FinancialPathExecutionAlgorithm} from "./FinancialPathExecutionAlgorithm";
import {FinancialPathResultFitnessFunction} from "./FinancialPathResultFitnessFunction";
import {FinancialPathExecutionResult} from "./FinancialPathExecutionResult";
import {TradeAuthorizer} from "../Trading/TradeAuthorizer";

/**
 * SimpleFinancialPathExecutionAlgorithm
 *
 * Version 1 implementation of FinancialPathExecutionAlgorithm.
 *
 * See FinancialPathExecutionAlgorithm
 */
export class SimpleFinancialPathExecutionAlgorithm extends FinancialPathExecutionAlgorithm {
    /**
     * tradeAuthroizer
     *
     * See TradeAuthrorizer
     *
     * tradeAuthorizers safeguard against mistakes and out-of-control trading
     * by forcing an additional layer of input before a trade is made.
     */
    private tradeAuthorizer: TradeAuthorizer;


    constructor(tradeAuthorizer: TradeAuthorizer) {
        super('Financial Path Execution', '~Async O(n)');
        this.tradeAuthorizer = tradeAuthorizer;
    }

    /**
     * complexityEstimate()
     *
     * Return n because our algorithm complexity is ~Async O(n)
     *
     * todo improve this estimate
     *
     * @param {number} n the number of vertices to guess complexity for
     * @returns {number} n - the complexity estimate
     */
    public complexityEstimate(n: number): number {
        return n;
    }

    /**
     * calculateExpectedResult()
     *
     * The FinancialPathExecutionAlgorithm takes a path (directed line graph) of financial nodes and executes
     *
     * @param {FinancialGraph} g the financial directed line graph to run the transactions of
     * @param {CurrencyVertex} start the vertex in graph g to start at (the first node)
     * @param {number} startingAmountBps amount in starting currency of first node (e.g. USD -> pips (USD bps))
     * @returns {Promise<FinancialPathResult>} the FinancialPathResult result of this transaction path
     */
    public execute(g: FinancialGraph, start: CurrencyVertex, startingAmountBps: number): Promise<FinancialPathResult> {
        return new Promise(((resolve, reject) => {
            let runningTotalBps = startingAmountBps;
            let startTime = Date.now();
            let names = [];
            let tradeResults = [];
            let tradeAuthorizer = this.tradeAuthorizer;

            //Keep count of the recursion depth just in case we get a loop and need to break
            let count = 0;

            //Finds the next edge from a start vertex; called by endTradeEdge() to get
            // the next edge to call startTradeEdge() again
            function findNextEdge(vertex) {
                for (let i = 0; i < g.getEdges().length; i++) {
                    if (g.getEdges()[i].getFrom().getId() === vertex.getId()) {
                        return g.getEdges()[i];
                    }
                }
                return null;
            }

            //Called once in execute() then recursively by endTradeEdge()
            // because the trade callback calls endTradeEdge()
            function startTradeEdge(edge) {
                //Increment the count variable so that we can break later if
                // we get out of control
                count++;

                //Add this edge's name to the trade list
                names.push(edge.getFrom().getLabel());

                let availableBps;
                if (tradeResults.length>0) {
                    availableBps = tradeResults[tradeResults.length-1].getCreditAmountBps();
                } else {
                    availableBps = startingAmountBps;
                }

                //Execute the trade asynchronously
                edge.executeTrade(tradeAuthorizer, availableBps)
                    .then(tradeResult => {
                        //Log the trade
                        tradeResults.push(tradeResult);

                        //Wrap up and start the next trade
                        return endTradeEdge(edge);
                    }, err => {
                        //Log the error
                        tradeResults.push(err);

                        //Log to the console
                        console.warn('error in trade execution; that really sucks.', err);

                        //Finish this execution; can't keep trading if there's an error.
                        return reject(err);
                    });
            }

            //Called by the trade callback in startTradeEdge()
            function endTradeEdge(edge) {
                //Invoke the next edge
                let nextEdge = findNextEdge(edge.getTo());
                if (nextEdge) {
                    //If there's another edge, make sure our recursion depth hasn't exceeded the path size
                    // this is to prevent loops if we get a cycle
                    if (count < g.getEdges().length) {
                        //Continue recursion because we got our next edge
                        return startTradeEdge(nextEdge);
                    } else {
                        //Halt recursion because we hit the place we started in the cycle
                        return finish(edge.getTo());
                    }
                } else {
                    //Halt recursion because we ran out of edges
                    return finish(edge.getTo());
                }
            }

            //Finish the trading process and resolve the promise
            function finish(endVertex) {
                let endTime = Date.now();
                names.push(endVertex.getLabel());
                let endingAmountBps = tradeResults[tradeResults.length-1].getCreditAmountBps();

                return resolve(new FinancialPathExecutionResult(
                    names.join('->'),
                    g,
                    startingAmountBps,
                    endingAmountBps,
                    endTime - startTime,
                    start,
                    endVertex,
                    tradeResults));
            }

            //Start the recursive process by calling startTradeEdge()
            startTradeEdge(findNextEdge(start));
        }));
    }
}