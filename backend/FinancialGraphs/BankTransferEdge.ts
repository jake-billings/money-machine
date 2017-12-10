import {CurrencyVertex} from "./CurrencyVertex";
import {CurrencyEdge} from "./CurrencyEdge";

/**
 * CryptoTransferEdge
 *
 * represents the ability to execute a bank transfer transaction
 *
 * Assumes only flat fees exist.
 *
 * Should only exist between bank transfer of the same currency type. Usually USD.
 *
 * See CurrencyEdge
 */
export class BankTransferEdge extends CurrencyEdge {
    /**
     * productName
     *
     * The product name of the transfer.
     *
     * Examples: "ACH", "Wire Transfer", "Zelle"
     */
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