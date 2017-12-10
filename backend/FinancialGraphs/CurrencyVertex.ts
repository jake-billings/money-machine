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

    public constructor(currency: Currency, exchange: Exchange) {
        super();
        this.currency = currency;
        this.exchange = exchange;
    }

    public getCurrency() : Currency {
        return this.currency;
    }

    public getExchange() : Exchange {
        return this.exchange;
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
            label: this.getLabel()
        }
    }
}