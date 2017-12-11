/**
 * Created by jakebillings on 12/7/17.
 */
import {CurrencyVertex} from "./CurrencyVertex";

import * as KrakenClient from 'kraken-api';

import {KrakenExchange} from "../Exchanges/KrakenExchange";
import {MarketExchangeCurrencyEdgeFactory} from "./MarketExchangeCurrencyEdgeFactory";

/**
 * Generates Kraken product ids from CurrencyVertex objects
 *
 * @param {CurrencyVertex} to
 * @param {CurrencyVertex} from
 * @returns {string} a valid Kraken product ID for the two vertices
 */
function makeKrakenProductId(to: CurrencyVertex, from: CurrencyVertex) {
    let a = ('X' + to.getCurrency().getSymbol() + 'Z' + from.getCurrency().getSymbol());
    a = a.replace('BTC', 'XBT');
    return a;
}
/**
 * KrakenEdgeFactory
 *
 * Loads market data to generate edges for Kraken Markets
 *
 * See MarketExchangeCurrencyEdgeFactory
 */
export class KrakenEdgeFactory extends MarketExchangeCurrencyEdgeFactory {
    private client: KrakenClient;
    private krakenProductId: string;

    /**
     * invert
     *
     * Kraken only offers markets in ETHUSD form with crypto first and USD later;
     * Our edges need to represent ETHUSD and USDETH. Invert is used to query the
     * market that exists, then we simply take the inverse to get the exchange
     * rate in the opposite direction.
     */
    private invert: boolean;

    public constructor(exchange: KrakenExchange, to: CurrencyVertex, from: CurrencyVertex, invert: boolean) {
        super(exchange, to, from);
        if (invert) {
            this.krakenProductId = makeKrakenProductId(from, to);
        } else {
            this.krakenProductId = makeKrakenProductId(to, from);
        }
        this.client = new KrakenClient(exchange.getKey(), exchange.getSecret());
        this.invert = invert;
    }

    public getRateBps(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            return this.client.api('Ticker', {pair: this.krakenProductId}, (err, data) => {
                if (err) return reject(err);
                if (data.error && (isNaN(data.error.length) || data.error.length > 0)) return reject(data.error);
                let price = parseFloat(data.result[this.krakenProductId]['a'][0]);
                if (this.invert) {
                    price = 1 / price;
                }
                return resolve(price * 10000);
            });
        });
    }

    protected getFeeToBps() {
        return 0;
    }

    protected getFeeFromBps() {
        return 0;
    }

    protected getFeeToProportionalBps() {
        return 160; //0.16% maker fee for XBT/USD, ETH/XBT, ETH/USD
    }

    protected getFeeFromProportionalBps() {
        return 0;
    }
}