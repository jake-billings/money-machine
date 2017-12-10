import {expect} from 'chai';
import {EqualCostFunction} from "../../../backend/GraphAlgorithms/CostFunctions/EqualCostFunction";
import {BasicEdge} from "../../../backend/BasicGraphs/BasicEdge";
import {BasicVertex} from "../../../backend/BasicGraphs/BasicVertex";

describe('EqualCostFunction', () => {
    let costFunction, edge;
    before(() => {
        costFunction = new EqualCostFunction();
        let to = new BasicVertex('to', 'to');
        let from = new BasicVertex('from', 'from');
        edge = new BasicEdge(to, from, 'edge', 'edge');
    });
    describe('getEdgeCost()', () => {
        it('should return 1', () => {
            expect(costFunction.getEdgeCost(edge)).to.equal(1);
        })
    });
});