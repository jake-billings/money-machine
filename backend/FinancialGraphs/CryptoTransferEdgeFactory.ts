import {CurrencyEdgeFactory} from "./CurrencyEdgeFactory";
import {CurrencyVertex} from "./CurrencyVertex";
import {CryptoTransferEdge} from "./CryptoTransferEdge";

/**
 * CryptoTransferEdgeFactory
 *
 * Factory class for edges between crypto exchanges and wallets in the cryptocurrency.
 *
 * See CurrencyEdgeFactory, CryptoTransferEdge, Exchange
 */
export class CryptoTransferEdgeFactory extends CurrencyEdgeFactory {
    private feeAmountBps: number;
    private feeProportionalAmountBps: number;
    private timeEstimateSec: number;

    constructor(to: CurrencyVertex, from: CurrencyVertex,
                feeAmountBps: number, feeProportionalAmountBps: number,
                timeEstimateSec: number) {
        super(to, from);

        if (to.getCurrency().getSymbol() !== from.getCurrency().getSymbol()) {
            throw new Error('CryptoTransferEdges must be of the same currency.')
        }

        this.feeAmountBps = feeAmountBps;
        this.feeProportionalAmountBps = feeProportionalAmountBps;

        this.timeEstimateSec = timeEstimateSec;
    }

    public getEdge(): Promise<CryptoTransferEdge> {
        return new Promise<CryptoTransferEdge>((resolve, reject) => {
            let e = new CryptoTransferEdge(
                this.getTo(),
                this.getFrom(),
                this.getId(),
                this.getLabel(),
                this.getFeeAmountBps(),
                this.getFeeProportionalAmountBps(),
                this.getTimeEstimateSec()
            );
            return resolve(e);
        });
    }

    protected getId(): string {
        return this.getTo().getExchange().getName() + '-' + this.getFrom().getExchange().getName() + '-' + this.getTo().getCurrency().getSymbol() + '-Transfer';
    }

    protected getRateBps(): Promise<number> {
        return new Promise(resolve => {
            return resolve(10000);
        });
    }

    protected getFeeToBps() {
        return this.getFeeAmountBps();
    }

    protected getFeeFromBps() {
        return 0;
    }

    protected getFeeToProportionalBps() {
        return this.getFeeProportionalAmountBps();
    }

    protected getFeeFromProportionalBps() {
        return 0;
    }

    protected getLabel() {
        return this.getTo().getCurrency().getSymbol();
    }

    protected getFeeAmountBps(): number {
        return this.feeAmountBps;
    }

    protected getFeeProportionalAmountBps(): number {
        return this.feeProportionalAmountBps;
    }
    protected getTimeEstimateSec() {
        return this.timeEstimateSec;
    }
}