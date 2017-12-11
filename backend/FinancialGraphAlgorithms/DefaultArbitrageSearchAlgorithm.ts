import {SimpleArbitrageSearchAlgorithm} from "./SimpleArbitrageSearchAlgorithm";
import {JohnsonsCycleFindingAlgorithm} from "../GraphAlgorithms/JohnsonsCycleFindingAlgorithm";
import {SimpleFinancialPathSimulationAlgorithm} from "./SimpleFinancialPathSimulationAlgorithm";

/**
 * DefaultArbitrageSearchAlgorithm
 *
 * DefaultArbitrageSearchAlgorithm is a SimpleArbitrageSearchAlgorithm that uses the recommended Cycle-Finding and Path
 * Simulation algorithms for arbitrage search.
 *
 * These are currently: JohnsonsCycleFindingAlgorithm, and SimpleFinancialPathSimulationAlgorithm
 */
export class DefaultArbitrageSearchAlgorithm extends SimpleArbitrageSearchAlgorithm {
    constructor() {
        super(new JohnsonsCycleFindingAlgorithm(), new SimpleFinancialPathSimulationAlgorithm());
    }
}