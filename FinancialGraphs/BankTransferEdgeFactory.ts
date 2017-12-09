import {CurrencyEdgeFactory} from "./CurrencyEdgeFactory";
import {CurrencyVertex} from "./CurrencyVertex";
import {BankTransferEdge} from "./BankTransferEdge";

/**
 * BankTransferEdgeFactory
 *
 * Factory class for edges between banks in USD.
 *
 * See CurrencyEdgeFactory, BankTransferEdge, BankExchange
 */
export class BankTransferEdgeFactory extends CurrencyEdgeFactory {
    private feeToDollars: number;
    private feeFromDollars: number;
    private productName: string;
    private timeEstimateSec: number;

    constructor(productName:string, to: CurrencyVertex, from: CurrencyVertex,
                feeToDollars: number, feeFromDollars: number, timeEstimateSec: number) {
        super(to, from);

        if (to.getCurrency().getSymbol() !== 'USD') {
            throw new Error('BankTransferEdges must be in USD.')
        }
        if (from.getCurrency().getSymbol() !== 'USD') {
            throw new Error('BankTransferEdges must be in USD.')
        }

        this.productName = productName;

        this.feeToDollars = feeToDollars;
        this.feeFromDollars = feeFromDollars;

        this.timeEstimateSec = timeEstimateSec;
    }

    public getEdge(): Promise<BankTransferEdge> {
        return new Promise<BankTransferEdge>((resolve, reject) => {
            let e = new BankTransferEdge(
                this.getProductName(),
                this.getTo(),
                this.getFrom(),
                this.getId(),
                this.getLabel(),
                this.getFeeToDollars(),
                this.getFeeFromDollars(),
                this.getTimeEstimateSec()
            );
            return resolve(e);
        });
    }

    protected getId(): string {
        return this.getTo().getExchange().getName() + '-' + this.getFrom().getExchange().getName() + '-' + this.getProductName()+'-Transfer';
    }

    protected getRateBps(): Promise<number> {
        return new Promise(resolve => {
            return resolve(10000);
        });
    }

    protected getFeeToBps() {
        return this.getFeeToDollars() * 10000;
    }

    protected getFeeFromBps() {
        return this.getFeeFromDollars() * 10000;
    }

    protected getFeeToProportionalBps() {
        return 0;
    }

    protected getFeeFromProportionalBps() {
        return 0;
    }

    protected getTimeEstimateSec() {
        return this.timeEstimateSec;
    }

    protected getFeeToDollars(): number {
        return this.feeToDollars;
    }

    protected getFeeFromDollars(): number {
        return this.feeFromDollars;
    }
    protected getProductName(): string {
        return this.productName;
    }
    protected getLabel(): string {
        return this.productName;
    }

}