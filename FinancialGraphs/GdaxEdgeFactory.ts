import {CurrencyVertex} from "./CurrencyVertex";

import {PublicClient} from 'gdax';
import {GdaxExchange} from "../Exchanges/GdaxExchange";
import {MarketExchangeCurrencyEdgeFactory} from "./MarketExchangeCurrencyEdgeFactory";

/**
 * Generates GDAX product ids from CurrencyVertex objects
 *
 * @param {CurrencyVertex} to
 * @param {CurrencyVertex} from
 * @returns {string} a valid GDAX product ID for the two vertices
 */
function makeGdaxProductId(to: CurrencyVertex, from: CurrencyVertex) {
    return to.getCurrency().getSymbol() + '-' + from.getCurrency().getSymbol();
}

/**
 * GdaxEdgeFactory
 *
 * Loads market data to generate edges for Gdax Markets
 *
 * See MarketExchangeCurrencyEdgeFactory
 */
export class GdaxEdgeFactory extends MarketExchangeCurrencyEdgeFactory {
    /**
     * publicClient
     *
     * The native node GDAX API client
     *
     * Initialized in constructor
     */
    private publicClient: PublicClient;

    /**
     * gdaxProductId
     *
     * The product id of the market on the GDAX exchange
     *
     * Initialized in constructor
     *
     * See makeGdaxProductId()
     */
    private gdaxProductId: string;

    /**
     * invert
     *
     * Gdax only offers markets in ETHUSD form with crypto first and USD later;
     * Our edges need to represent ETHUSD and USDETH. Invert is used to query the
     * market that exists, then we simply take the inverse to get the exchange
     * rate in the opposite direction.
     */
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