import {Serializable} from "./Serializable";

export abstract class Vertex implements Serializable {
    public abstract getId() : string;
    public abstract getLabel() : string;
    public abstract serialize() : object;
}