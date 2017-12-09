import {Currency} from "./Currency";

/**
 * CurrencyUSD
 *
 * United States Dollar
 *
 * See Currency
 */
export class CurrencyUSD extends Currency {
    public constructor() {
        super("United States Dollar", "USD");
    };
}