/**
 * Exchange
 *
 * The exchange class holds metadata about any entity that holds currency.
 * Banks and Market exchanges can all be exchanges.
 *
 * BankExchange instances are Exchanges that handle only one currency (in our model)
 *
 * Examples: GDAX, Kraken
 * BankExchange Examples: Wells Fargo, Schwab
 */
export abstract class Exchange {
    /**
     * name
     *
     * The name of the exchanges
     *
     * Examples: Wells Fargo, Kraken
     */
    private name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}