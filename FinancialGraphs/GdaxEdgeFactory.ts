/**
 * Created by jakebillings on 12/7/17.
 */
import {CurrencyVertex} from "./CurrencyVertex";

import {PublicClient} from 'gdax';
import {GdaxExchange} from "./GdaxExchange";
import {MarketExchangeCurrencyEdgeFactory} from "./MarketExchangeCurrencyEdgeFactory";


function makeGdaxProductId(to: CurrencyVertex, from: CurrencyVertex) {
    return to.getCurrency().getSymbol() + '-' + from.getCurrency().getSymbol();
}

export class GdaxEdgeFactory extends MarketExchangeCurrencyEdgeFactory {
    private publicClient: PublicClient;
    private gdaxProductId: string;
    private invert: boolean;

    public constructor(exchange: GdaxExchange, to: CurrencyVertex, from: CurrencyVertex, invert: boolean) {
        super(exchange, to, from);

        if (invert) {
            this.gdaxProductId = makeGdaxProductId(from, to);
        } else {
            this.gdaxProductId = makeGdaxProductId(to, from);
        }
        this.publicClient = new PublicClient(this.gdaxProductId);
        this.invert = invert;
    }

    public getRateBps(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            return this.publicClient.getProductTicker((err, response, data) => {
                if (err) return reject(err);
                let price = parseFloat(data.price);
                if (this.invert) {
                    price = 1 / price;
                }
                return resolve(price*10000);
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