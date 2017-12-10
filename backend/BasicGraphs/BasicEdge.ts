import {Edge} from "../Graphs/Edge";
import {Vertex} from "../Graphs/Vertex";

/**
 * BasicEdge
 *
 * Basic edge implementation intended for unit testing of abstract Graph functions
 *
 * Stores static id and label
 */
export class BasicEdge extends Edge {
    /**
     * id
     *
     * A string unique id for the edge
     *
     * Example: '0', 'jeff'
     */
    private id : string;


    /**
     * label
     *
     * A string unique label for the edge
     *
     * Example: '0', 'jeff'
     */
    private label : string;

    constructor(
        to: Vertex, from: Vertex,
        id: string, label: string) {
        super(to, from);
        this.id = id;
        this.label = label;
    }

    public getId() : string {
        return this.id;
    }

    public getLabel() : string {
        return this.label;
    }
}