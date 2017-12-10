/**
 * Currency
 *
 * Singleton; only one instance should exist
 * Immutable; properties should not change
 *
 * Comparisons should be made by comparing getSymbol(); symbols should all be unique
 *
 * The currency class holds metadata about a currency.
 * It's used by currency edges to store currency data.
 *
 * Examples: CurrencyBTC (Bitcoin), CurrencyUSD (United States Dollar)
 */
export abstract class Currency {
    /**
     * name
     *
     * The name of the Currency
     *
     * Example: Dollar, Bitcoin
     */
    private name: string;

    /**
     * symbol
     *
     * The ticker symbol of the Currency
     *
     * Example: USD, BTC
     */
    private symbol: string;

    protected constructor(name: string, symbol: string) {
        this.name = name;
        this.symbol = symbol;
    }

    public getName(): string {
        return this.name;
    }

    public getSymbol(): string {
        return this.symbol;
    }
}