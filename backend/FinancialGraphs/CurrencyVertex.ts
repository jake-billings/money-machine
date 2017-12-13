import {Currency} from "../Currencies/Currency";
import {Exchange} from "../Exchanges/Exchange";
import {Vertex} from "../Graphs/Vertex";

/**
 * CurrencyVertex
 *
 * represents the potential to store a currency at an exchange (or bank)
 *
 * Examples: Bank Accounts, Bitcoin Wallets, Ethereum Balance on Gdax
 */
export class CurrencyVertex extends Vertex {
    /**
     * currency
     *
     * The currency type of the vertex
     *
     * Examples: CurrencyUSD, CurrencyBTC
     */
    private currency: Currency;

    /**
     * exchange
     *
     * The exchange (or bank) where the currency is held
     *
     * Examples: Wells Fargo, GDAX
     */
    private exchange: Exchange;

    /**
     * startAmountBps
     *
     * The starting trade size if a trade is executed from this node
     *
     * In the currency the node represents
     *
     * Example: 10,000 pips (USD bps)  = $1
     */
    private startAmountBps: number;

    public constructor(currency: Currency, exchange: Exchange, startAmountBps: number) {
        super();
        this.currency = currency;
        this.exchange = exchange;
        this.startAmountBps = startAmountBps;
    }

    public getCurrency(): Currency {
        return this.currency;
    }

    public getExchange(): Exchange {
        return this.exchange;
    }

    public getStartAmountBps(): number {
        return this.startAmountBps;
    }

    public getId(): string {
        return this.getExchange().getName() + this.getCurrency().getSymbol();
    }

    public getLabel(): string {
        return this.getExchange().getName() + ' ' + this.getCurrency().getSymbol();
    }

    public serialize() : Object {
        return {
            id: this.getId(),
            label: this.getLabel(),
            startAmountBps: this.getStartAmountBps(),
            currency: this.getCurrency().serialize()
        }
    }
}