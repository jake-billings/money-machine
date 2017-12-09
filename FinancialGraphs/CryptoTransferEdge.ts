import {CurrencyVertex} from "./CurrencyVertex";
import {CurrencyEdge} from "./CurrencyEdge";

/**
 * CryptoTransferEdge
 *
 * represents the ability to execute a cryptocurrency transaction
 *
 * Should only exist between cryptocurrencies of the same type.
 *
 * See CurrencyEdge
 */
export class CryptoTransferEdge extends CurrencyEdge {
    /**
     * Creates a CryptoTransferEdge
     *
     * @param {CurrencyVertex} to The destination currency vertex
     * @param {CurrencyVertex} from The source currency vertex
     * @param {string} id a unique id (usually generated by factory; see CurrencyEdge docs)
     * @param {string} label a useful label (usually generated by factory; see CurrencyEdge docs)
     * @param {number} feeAmountBps sets the feeToAmountBps field of the currencyEdge
     * @param {number} feeProportionalAmountBps sets the feeToProportionalAmountBps field of the currencyEdge
     * @param {number} timeEstimateSec the estimated number of seconds it will take for the transfer to process
     */
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