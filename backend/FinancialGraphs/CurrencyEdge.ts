import {Edge} from "../Graphs/Edge";
import {CurrencyVertex} from "./CurrencyVertex";
import {TradeResult} from "../Trading/TradeResult";
import {TradeAuthorizer} from "../Trading/TradeAuthorizer";

/**
 * CurrencyEdge
 *
 * CurrencyEdge is a directed edge in the financial graph that represents a way to move currency between currency nodes.
 * CurrencyEdge should hold all information about a potential transaction including rates and fees.
 * CurrencyEdges can be simple transfers or can be market exchange rates.
 *
 * See all subclasses.
 *
 * Examples: Bitcoin Transfer, ACH Transfer, BTCUSD Market
 */
export abstract class CurrencyEdge extends Edge {
    /**
     * id
     *
     * Unique id for the CurrencyEdge; usually generated by the factory and somewhat human-readable
     *
     * Example: ETH-USD-Kraken
     */
    private id: string;

    /**
     * label
     *
     * The label to display when rendering the edge to a user
     *
     * Examples: "ACD" or "15999 BTCUSD"
     */
    private label: string;

    /**
     * calculateEdgeOutcome()
     *
     * Calculates the outcome of a transaction over this edge
     *
     * @param {number} amountBps The amount of money to calculate fee cost with;
     *                        Some fees are proportional to transaction size, so
     *                        this amount is required
     *                        in BPS
     *                        for instance, if it's dollars, this is pips (USD bps)
     *                        $1,000 = 10,000,000 pips (USD bps)
     */
    public calculateEdgeOutcome(amountBps: number) {
        let runningTotalBps = amountBps;

        //Apply flat from fee
        runningTotalBps -= this.getFeeFromBps();

        //Apply rate conversion
        runningTotalBps *= this.getRateBps(runningTotalBps) / 10000;

        //Apply from spread
        runningTotalBps -= runningTotalBps * this.getFeeFromProportionalBps() / 10000;

        //Apply to spread
        runningTotalBps -= runningTotalBps * this.getFeeToProportionalBps() / 10000;

        //Apply flat to fee
        runningTotalBps -= this.getFeeToBps();

        return runningTotalBps;
    }

    /**
     * executeTrade()
     *
     * Executes a trade along this edge at the exchange it represents IF our trade authorizer allows it.
     * A TradeAuthorizer (see TradeAuthorizer) checks with a set of rules to ensure a trade is allowed.
     * For instance, it may ask for human input every time.
     *
     * WARNING: this is not for the faint of heart.
     *
     * This will execute a trade using real money. There should be safety in place around this method.
     *
     * @param {TradeAuthorizer} authorizer The trade authorizer to use for the trade; helps prevent mistakes
     * @param {number} amountBps The size of the trade to make
     */
    public executeTrade(authorizer: TradeAuthorizer, amountBps: number): Promise<TradeResult> {
        return new Promise<TradeResult>(((resolve, reject) => {
            authorizer.authorizeTrade(this, amountBps)
                .then(authorized => {
                    if (authorized) {
                        this.executeAuthorizedTrade(amountBps).then(resolve, reject);
                    } else {
                        return reject({
                            message: 'trade not authorized by TradeAuthorizer'
                        });
                    }
                }, err => {
                    return reject(err);
                });
        }));
    }

    /**
     * executeAuthorizedTrade()
     *
     * Executes a trade along this edge at the exchange. This should NEVER be invoked directly. Always use
     * executeTrade() and a TradeAuthroizer to prevent mistakes.
     *
     * WARNING: this is not for the faint of heart.
     *
     * WARNING: DO NOT INVOKE DIRECTLY; USE executeTrade() and TradeAuthorizer
     *
     * This will execute a trade using real money. There should be safety in place around this method.
     *
     * @param {number} amountBps The size of the trade to make
     * @returns Promise<TradeResult> A promise of a TradeResult object representing the completed trade
     */
    protected abstract executeAuthorizedTrade(amountBps: number): Promise<TradeResult>;

    constructor(from: CurrencyVertex,
                to: CurrencyVertex,
                id: string,
                label: string) {
        super(from, to);
        this.id = id;
        this.label = label;
    }

    public getId() {
        return this.id;
    }

    public getLabel() {
        return this.label;
    }

    public getTo(): CurrencyVertex {
        return super.getTo() as CurrencyVertex; //Constructor only accepts CurrencyVertex, so this is okay
    }

    public getFrom(): CurrencyVertex {
        return super.getFrom() as CurrencyVertex; //Constructor only accepts CurrencyVertex, so this is okay
    }

    public abstract getRateBps(volumeBps: number): number;

    public abstract getFeeToBps(): number;

    public abstract getFeeFromBps(): number;

    public abstract getFeeToProportionalBps(): number;

    public abstract getFeeFromProportionalBps(): number;

    public abstract getTimeEstimateSec(): number;

    public abstract isOnline(): boolean;
}