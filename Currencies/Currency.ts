/**
 * Created by jakebillings on 12/7/17.
 */
export abstract class Currency {
    private name: string;
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