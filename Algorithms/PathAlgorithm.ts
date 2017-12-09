import {Graph} from "./Graph";
import {CurrencyEdge} from "./CurrencyEdge";

export abstract class PathAlgorithm {
    private name: string;

    public getName() : string {
        return this.name;
    };

    public generatePaths(g: Graph) : Array<Array<CurrencyEdge>> {
        return [[]];
    }
}