import {Exchange} from "./Exchange";

/**
 * KrakenExchange
 *
 * Kraken
 *
 * See Exchange
 */
export class KrakenExchange extends Exchange {
    private key: string;
    private secret: string;

    public constructor(key:string, secret:string) {
        super("Kraken");
        this.key = key;
        this.secret = secret;
    };

    public getKey():string {
        return this.key;
    }
    public getSecret():string {
        return this.secret;
    }
}