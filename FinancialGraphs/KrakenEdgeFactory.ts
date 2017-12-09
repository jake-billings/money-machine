/**
 * Created by jakebillings on 12/7/17.
 */
import {CurrencyVertex} from "./CurrencyVertex";

import * as KrakenClient from 'kraken-api';

import {KrakenExchange} from "../Exchanges/KrakenExchange";
import {MarketExchangeCurrencyEdgeFactory} from "./MarketExchangeCurrencyEdgeFactory";


function makeKrakenProductId(to: CurrencyVertex, from: CurrencyVertex) {
    let a = ('X' + to.getCurrency().getSymbol() + 'Z' + from.getCurrency().getSymbol());
    a = a.replace('BTC', 'XBT');
    return a;
}

export class KrakenEdgeFactory extends MarketExchangeCurrencyEdgeFactory {
    private client: KrakenClient;
    private krakenProductId: string;
    private invert: boolean;

    public constructor(exchange: KrakenExchange, to: CurrencyVertex, from: CurrencyVertex, invert: boolean) {
        super(exchange, to, from);
        if (invert) {
            this.krakenProductId = makeKrakenProductId(from, to);
        } else {
            this.krakenProductId = makeKrakenProductId(to, from);
        }
        this.client = new KrakenClient(exchange.getKey(), exchange.getSecret());
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
        return 0;
    }

    protected getFeeFromProportionalBps() {
        return 0;
    }
}