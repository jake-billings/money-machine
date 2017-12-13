import {FinancialPathResultFitnessFunction} from "./FinancialPathResultFitnessFunction";
import {FinancialPathResult} from "./FinancialPathResult";
import {CostFunction} from "../GraphAlgorithms/CostFunctions/CostFunction";

/**
 * SpecialSauce
 *
 * SpecialSauce is a type of FinancialPathResultFitnessFunction that contains hand-tuned weights and algorithms
 *
 * The higher the result returned by gitFitness() the better the solution is
 */
export class SpecialSauce extends FinancialPathResultFitnessFunction {
    /**
     * Initialize with the name Special Sauce and complexity O(1)
     */
    constructor() {
        super('Special Sauce', 'O(1)');
    }

    /**
     * complexityEstimate()
     *
     * Return 1because our complexity is O(1)
     *
     * @param {number} n
     * @returns {number}1
     */
    public complexityEstimate(n: number) {
        return 1;
    }

    /**
     * getFitness()
     *
     * The higher the result returned by gitFitness() the better the solution is
     *
     * @param {FinancialPathResult} result FinancialPathResult to evaluate
     */
    public getFitness(result: FinancialPathResult) {
        //todo properly evaluate the fitness of a result
        // return -1*result.getTimeSec(); //todo
        return result.getProfitBps();
    }
}