import {CurrencyVertex} from "./CurrencyVertex";
import {CurrencyEdge} from "./CurrencyEdge";

export class CryptoTransferEdge extends CurrencyEdge {
    constructor(to: CurrencyVertex,
                from: CurrencyVertex,
                id: string,
                label: string,
                feeAmountBps: number,
                feeProportionalAmountBps: number,
                timeEstimateSec: number) {
        if (to.getCurrency().getSymbol() !== from.getCurrency().getSymbol()) {
            throw new Error('Cannot create a crypto transfer edge between different currencies.');
        }

        super(
            to,
            from,
            id,
            label,
            10000,
            feeAmountBps,
            0,
            feeProportionalAmountBps,
            0,
            timeEstimateSec,
            true);
    }
}