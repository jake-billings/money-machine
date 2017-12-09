import {CurrencyEdgeFactory} from "./CurrencyEdgeFactory";
import {CurrencyVertex} from "./CurrencyVertex";
import {Exchange} from "../Exchanges/Exchange";
import {CurrencyEdge} from "./CurrencyEdge";

export abstract class MarketExchangeCurrencyEdgeFactory extends CurrencyEdgeFactory {
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

    public getName(): string {
        return this.exchange.getName() + ' ' + this.getTo().getCurrency().getSymbol() + this.getFrom().getCurrency().getSymbol();
    }

    protected getId(): string {
        return this.exchange.getName() + this.getTo().getCurrency().getSymbol() + this.getFrom().getCurrency().getSymbol();
    }

    protected getLabel() : string {
        throw Error("Need to load the market data first; not implemented");
    }

    protected getTimeEstimateSec() {
        return 1;
    }
}