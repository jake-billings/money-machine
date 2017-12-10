import {Vertex} from "../Graphs/Vertex";

/**
 * BasicVertex
 *
 * Basic vertex implementation intended for unit testing of abstract Graph functions
 *
 * Stores static id and label
 */
export class BasicVertex extends Vertex {

    /**
     * id
     *
     * A string unique id for the vertex
     *
     * Example: '0', 'jeff'
     */
    private id : string;


    /**
     * label
     *
     * A string unique label for the vertex
     *
     * Example: '0', 'jeff'
     */
    private label : string;

    constructor(id: string, label: string) {
        super();
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