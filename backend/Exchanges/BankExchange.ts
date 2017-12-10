import {Exchange} from "./Exchange";
import {Currency} from "../Currencies/Currency";

/**
 * BankExchange
 *
 * Special type of Exchange that represents a bank
 *
 * BankExchanges deal exclusively in one currency
 *
 * Example: Wells Fargo deals exclusively in dollars (in the US)
 *
 * See Exchange
 */
export class BankExchange extends Exchange {
    private currency:Currency;

    constructor(name: string, currency: Currency) {
        super(name);
    }
    public getCurrency() : Currency {
        return this.currency;
    }
}