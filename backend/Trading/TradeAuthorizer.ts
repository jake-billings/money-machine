/**
 * TradeAuthorizer
 *
 * Superclass to all methods of trade authorization
 *
 * E.g. DateRangeAuthorizer, HumanInputAuthorizer
 */
import {CurrencyEdge} from "../FinancialGraphs/CurrencyEdge";

export abstract class TradeAuthorizer {
    /**
     * The name of this particular authorizer
     *
     * to be provided by subclass constructor
     */
    private name: String;

    constructor(name: String) {
        this.name = name;
    }

    /**
     * authorizeTrade()
     *
     * Returns true if a given trade is authorized by the authorization scheme
     *
     * @param {CurrencyEdge} edge A Currency edge representing the market the trade is on
     * @param {number} amountBps The amount to be traded in currency basis points of the start node
     * @returns {boolean} true if the trade is authorized
     */
    public abstract authorizeTrade(edge: CurrencyEdge, amountBps: number) : Promise<boolean>;

    public getName() {
        return this.name;
    }
}