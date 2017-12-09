/**
 * Created by jakebillings on 12/7/17.
 */
export abstract class Exchange {
    private name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}