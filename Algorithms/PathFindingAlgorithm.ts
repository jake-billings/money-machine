import {Graph} from "../Graphs/Graph";
import {Algorithm} from "./Algorithm";

export abstract class PathFindingAlgorithm extends Algorithm {
    public abstract findPath(g: Graph): Graph;

}