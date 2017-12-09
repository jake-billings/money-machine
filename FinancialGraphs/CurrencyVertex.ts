/**
 * Created by jakebillings on 12/7/17.
 */
import {Currency} from "../Currencies/Currency";
import {Exchange} from "../Exchanges/Exchange";
import {Vertex} from "../Graphs/Vertex";

export class CurrencyVertex extends Vertex {
    private currency: Currency;
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