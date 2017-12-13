import {CurrencyEdge} from "../FinancialGraphs/CurrencyEdge";

/**
 * TradeResult
 *
 * The TradeResult class represents a trade that successfully executed on an exchange.
 */
export class TradeResult {
    /**
     * executedAt
     *
     * The date and time the trade executed at
     */
    private executedAt: Date;

    /**
     * currencyEdge
     *
     * The currency edge that describes the market the trade occurred on
     */
    private currencyEdge: CurrencyEdge;

    /**
     * debitAmountBps
     *
     * The amount debited from the "from" vertex of the currencyEdge in basis points of the "from" currency
     */
    private debitAmountBps: number;

    /**
     * creditAmountBps
     *
     * The amount debited to the "to" vertex of the currencyEdge in basis points of the "to" currency
     */
    private creditAmountBps: number;

    constructor(executedAt: Date, currencyEdge: CurrencyEdge, debitAmountBps: number, creditAmountBps: number) {
        this.executedAt = executedAt;
        this.currencyEdge = currencyEdge;
        this.debitAmountBps = debitAmountBps;
        this.creditAmountBps = creditAmountBps;
    }

    public getExecutedAt() : Date {
        return this.executedAt;
    }

    public getCurrencyEdge() : CurrencyEdge {
        return this.currencyEdge;
    }

    public getDebitAmountBps() : number {
        return this.debitAmountBps;
    }

    public getCreditAmountBps() : number {
        return this.creditAmountBps;
    }
}