import {CurrencyEdgeFactory} from "./CurrencyEdgeFactory";
import {CurrencyVertex} from "./CurrencyVertex";
import {Exchange} from "../Exchanges/Exchange";
import {CurrencyEdge} from "./CurrencyEdge";

/**
 * MarketExchangeCurrencyEdgeFactory
 *
 * Superclass for all CurrencyEdgeFactories that create CurrencyEdges representing digital
 * asset exchange markets.
 *
 * Subclasses handle loading from specific exchange APIs
 *
 * Vertices must be on the same exchange
 */
export abstract class MarketExchangeCurrencyEdgeFactory extends CurrencyEdgeFactory {
    /**
     * exchange
     *
     * The Exchange where the market exists
     *
     * Examples: GDAX, Kraken
     */
    private exchange: Exchange;

    protected constructor(exchange: Exchange, to: CurrencyVertex, from: CurrencyVertex) {
        if (to.getExchange() !== exchange) {
            throw new Error('to node must have the same exchange as edgefactory it is added to')
        }
        if (from.getExchange() !== exchange) {
            throw new Error('from node must have the same exchange as edgefactory it is added to')
        }

        super(to, from);


        this.exchange = exchange;
    }

    /**
     * getEdge()
     *
     * Generate the edge after loading the current exchange rate
     *
     * @returns {Promise<CurrencyEdge>} A promise of an edge that will exist once the API calls back.
     *  If the load fails, an edge is created with the "online" property set to false.
     */
    public getEdge(): Promise<CurrencyEdge> {
        return new Promise<CurrencyEdge>((resolve, reject) => {
            return this.getRateBps().then(rateBps => {
                let rateStr;
                if (rateBps<10000) {
                    rateStr = '1/'+(10000/rateBps).toFixed(3).toString();
                } else {
                    rateStr = (rateBps/10000).toFixed(3).toString();
                }
                console.log(rateStr, 'rateStr', rateBps)

                let e = new CurrencyEdge(
                    this.getTo(),
                    this.getFrom(),
                    this.getId(),
                    rateStr,
                    rateBps,
                    this.getFeeToBps(),
                    this.getFeeFromBps(),
                    this.getFeeToProportionalBps(),
                    this.getFeeFromProportionalBps(),
                    this.getTimeEstimateSec(),
                    true
                );
                return resolve(e);
            }, err => {
                console.warn('failed to load edge', this);

                let e = new CurrencyEdge(
                    this.getTo(),
                    this.getFrom(),
                    this.getId(),
                    'offline',
                    null,
                    this.getFeeToBps(),
                    this.getFeeFromBps(),
                    this.getFeeToProportionalBps(),
                    this.getFeeFromProportionalBps(),
                    this.getTimeEstimateSec(),
                    true
                );
                return resolve(e);
            });
        });
    }

    /**
     * getName()
     *
     * Generates a useful name for the market this edge represents
     *
     * @returns {string} name
     */
    public getName(): string {
        return this.exchange.getName() + ' ' + this.getTo().getCurrency().getSymbol() + this.getFrom().getCurrency().getSymbol();
    }

    /**
     * getId()
     *
     * Generates a useful id for the market this edge represents
     *
     * @returns {string} id
     */
    protected getId(): string {
        return this.exchange.getName() + this.getTo().getCurrency().getSymbol() + this.getFrom().getCurrency().getSymbol();
    }

    protected getLabel() : string {
        throw Error("Need to load the market data first; not implemented");
    }

    /**
     * getTimeEstimateSec()
     *
     * Exchanges operate almost instantly; unlike transfers.
     * If this isn't the case, override in a subclass or change this value.
     *
     * @returns {number} 5
     */
    protected getTimeEstimateSec() {
        return 5;
    }
}