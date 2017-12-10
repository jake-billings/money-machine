import {expect} from 'chai';
import {Edge} from "../../backend/Graphs/Edge";
import {BasicEdge} from "../../backend/BasicGraphs/BasicEdge";
import {BasicVertex} from "../../backend/BasicGraphs/BasicVertex";

describe('BasicVertex', () => {
    let to;
    before(() => {
        to = new BasicVertex('id_to', 'label_to');
    });
    it('should store id', () => {
        expect(to.getId()).to.equal('id_to');
    });
    it('should store label', () => {
        expect(to.getLabel()).to.equal('label_to');
    });
});