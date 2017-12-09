/**
 * Algorithm
 *
 * This abstract class is intended to be the super class of any piece of code that risks exceeding ~10ms of compute
 * time. Subclasses should be as abstract and as general as possible in order to allow for the reuse of code.
 *
 * Direct subclasses of algorithm should specify the result of the algorithm. For instance, an polymorphic chain may
 * appear as follows: Algorithm -> GraphAlgorithm -> PathFindingAlgorithm -> ShortestPathFindingAlgorithm -> DijkstrasAlgorithm
 */
export abstract class Algorithm {
    /**
     * name
     * The name of the algorithm
     * Example: Dijkstra's Algorithm
     */
    private name: string;

    /**
     * complexityOrder
     * A string representing the algorithm's complexity
     * Examples: "O(n^2)", "O(n*log(n))"
     */
    private complexityOrder: string;

    /**
     * complexityEstimate()
     * Return an estimate of the number of loop iterations the algorithm will take;
     * Plug n into the complexity order.
     * Example: if complexity order is O(n^2), this function should return n^2 or cn^2 where c is some integer
     * @param {number} n The number of elements submitted into the algorithm
     */
    public abstract complexityEstimate(n: number);

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

}