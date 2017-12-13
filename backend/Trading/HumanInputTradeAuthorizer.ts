import {TradeAuthorizer} from "./TradeAuthorizer";
import {CurrencyEdge} from "../FinancialGraphs/CurrencyEdge";

import * as readline from "readline";

export class HumanInputTradeAuthorizer extends TradeAuthorizer {
    private rl: any;

    constructor() {
        super('Human Input Trade Authorizer');

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public authorizeTrade(edge: CurrencyEdge, amountBps: number): Promise<boolean> {
        return new Promise(resolve => {
            this.rl.question(
                `Do you authorize the trade of ${amountBps/10000} ${edge.getFrom().getCurrency().getSymbol()} for ${edge.calculateEdgeOutcome(amountBps)/10000} ${edge.getTo().getCurrency().getSymbol()}? (Type "Yes" to confirm): `, (answer) => {
                    if (answer==='Yes') {
                        console.info('Trade authorized. Now executing.');
                        return resolve(true);
                    }
                    console.info('Trade not authorized. Trade will not be executed.');
                    return resolve(false);
                });
        })
    }

    public close() {
        this.rl.close();
    }
}