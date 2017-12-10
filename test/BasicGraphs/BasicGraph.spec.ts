import {expect} from 'chai';
import {BasicEdge} from "../../backend/BasicGraphs/BasicEdge";
import {BasicVertex} from "../../backend/BasicGraphs/BasicVertex";
import {BasicGraph} from "../../backend/BasicGraphs/BasicGraph";

describe('BasicGraph', () => {
    describe('upsertVertex()', () => {
        let to, graph;
        beforeEach(() => {
            to = new BasicVertex('id_to', 'label_to');
            graph = new BasicGraph([],[])
        });

        describe('initial graph', () => {
            it('should not have any vertices or edges', () => {
                expect(graph.getEdges().length).to.equal(0);
                expect(graph.getVertices().length).to.equal(0);
            });
        });

        it('should insert a vertex if the vertex is not present', ()=>{
            expect(graph.getVertices().length).to.equal(0);
            graph.upsertVertex(to);
            expect(graph.getVertices().length).to.equal(1);
        });

        it('should not insert a vertex if the vertex is already present', ()=>{
            //Add the vertex
            expect(graph.getVertices().length).to.equal(0);
            graph.upsertVertex(to);
            expect(graph.getVertices().length).to.equal(1);

            //Add the vertex again
            graph.upsertVertex(to);
            expect(graph.getVertices().length).to.equal(1);
        });
    });

    describe('upsertEdge()', () => {
        let to, from, edge, graph;
        beforeEach(() => {
            to = new BasicVertex('id_to', 'label_to');
            from = new BasicVertex('id_from', 'label_from');
            edge = new BasicEdge(to, from, 'id_edge', 'label_edge');
            graph = new BasicGraph([],[]);

            graph.upsertVertex(to);
            graph.upsertVertex(from);
        });

        describe('initial graph', () => {
            it('should not have any edges', () => {
                expect(graph.getEdges().length).to.equal(0);
            });
            it('should not have two vertices edges', () => {
                expect(graph.getVertices().length).to.equal(2);
            });
        });

        it('should insert an edge if the edge is not present', ()=>{
            expect(graph.getEdges().length).to.equal(0);
            graph.upsertEdge(to);
            expect(graph.getEdges().length).to.equal(1);
        });

        it('should not insert an edge if the edge is already present', ()=>{
            //Add the edge
            expect(graph.getEdges().length).to.equal(0);
            graph.upsertEdge(edge);
            expect(graph.getEdges().length).to.equal(1);

            //Add the edge again
            graph.upsertEdge(edge);
            expect(graph.getEdges().length).to.equal(1);
        });
    });

    describe('containsVertex()', () => {
        let to, from, edge, graph;
        beforeEach(() => {
            to = new BasicVertex('id_to', 'label_to');
            from = new BasicVertex('id_from', 'label_from');
            edge = new BasicEdge(to, from, 'id_edge', 'label_edge');
            graph = new BasicGraph([],[]);

            graph.upsertVertex(to);
        });

        it('should return true if a graph contains a vertex', () => {
            expect(graph.containsVertex(to)).to.be.true;
        });

        it('should return false if a graph does not contain a vertex', () => {
            expect(graph.containsVertex(from)).to.be.false;
        });
    });

    describe('containsEdge()', () => {
        let to, from, edge, graph;
        beforeEach(() => {
            to = new BasicVertex('id_to', 'label_to');
            from = new BasicVertex('id_from', 'label_from');
            edge = new BasicEdge(to, from, 'id_edge', 'label_edge');
            graph = new BasicGraph([],[]);

            graph.upsertVertex(to);
            graph.upsertVertex(from);
        });

        it('should return false if a graph does not contain an edge', () => {
            expect(graph.containsEdge(edge)).to.be.false;
        });

        it('should return true if a graph contains an edge', () => {
            graph.upsertEdge(edge);
            expect(graph.containsEdge(edge)).to.be.true;
        });
    });
});