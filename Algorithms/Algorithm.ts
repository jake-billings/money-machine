export abstract class Algorithm {
    private name: string;
    private complexityOrder: string;

    constructor(name: string, complexityOrder) {
        this.name = name;
        this.complexityOrder = complexityOrder;
    }

    public getName() : string {
        return this.name;
    }

    public getComplexityOrder() : string {
        return this.complexityOrder;
    }

    public abstract complexityEstimate(n: number);
}