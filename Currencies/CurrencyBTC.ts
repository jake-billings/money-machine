import {Currency} from "./Currency";

/**
 * CurrencyBTC
 *
 * Bitcoin
 *
 * See Currency
 */
export class CurrencyBTC extends Currency {
    public constructor() {
        super("Bitcoin", "BTC");
    };
}