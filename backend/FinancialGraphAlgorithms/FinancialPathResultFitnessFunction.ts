import {FinancialGraphAlgorithm} from "./FinancialGraphAlgorithm";
import {FinancialPathResult} from "./FinancialPathResult";

/**
 * FinancialPathResultFitnessFunction
 *
 * Superclass used to evaluate the fitness of a FinancialPathResultFitnessFunction
 *
 * The higher the result returned by gitFitness() the better the solution is
 */
export abstract class FinancialPathResultFitnessFunction extends FinancialGraphAlgorithm {
    /**
     *
     * The higher the result returned by gitFitness() the better the solution is
     *
     * @param {FinancialPathResult} result FinancialPathResult to evaluate
     */
    public abstract getFitness(result: FinancialPathResult);
}