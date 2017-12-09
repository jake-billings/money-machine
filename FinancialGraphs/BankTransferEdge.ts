import {CurrencyVertex} from "./CurrencyVertex";
import {CurrencyEdge} from "./CurrencyEdge";

export class BankTransferEdge extends CurrencyEdge {
    private productName: string;

    constructor(productName: string,
                to: CurrencyVertex,
                from: CurrencyVertex,
                id: string,
                label: string,
                feeToDollars: number,
                feeFromDollars: number,
                timeEstimate: number) {
        super(
            to,
            from,
            id,
            label,
            10000,
            feeToDollars * 10000,
            feeFromDollars * 10000,
            0,
            0,
            timeEstimate,
            true);
        this.productName = productName;
    }

    public getProductName() : string {
        return this.productName;
    }
}