import {expect} from 'chai';
import {BasicEdge} from "../../backend/BasicGraphs/BasicEdge";
import {BasicVertex} from "../../backend/BasicGraphs/BasicVertex";

describe('BasicEdge', () => {
    let to, from, edge;
    before(() => {
        to = new BasicVertex('id_to', 'label_to');
        from = new BasicVertex('id_from', 'label_from');
        edge = new BasicEdge(to, from, 'id_edge', 'label_edge');
    });
    it('should store id', () => {
        expect(edge.getId()).to.equal('id_edge');
    });
    it('should store label', () => {
        expect(edge.getLabel()).to.equal('label_edge');
    });
    it('should store to vertex', () => {
        expect(edge.getTo().getId()).to.equal('id_to');
    });
    it('should store from vertex', () => {
        expect(edge.getFrom().getId()).to.equal('id_from');
    });
});