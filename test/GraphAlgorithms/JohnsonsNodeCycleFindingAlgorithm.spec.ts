import {expect} from 'chai';

import {BasicVertex} from "../../backend/BasicGraphs/BasicVertex";
import {BasicEdge} from "../../backend/BasicGraphs/BasicEdge";
import {BasicGraph} from "../../backend/BasicGraphs/BasicGraph";
import {JohnsonsNodeCycleFindingAlgorithm} from "../../backend/GraphAlgorithms/JohnsonsNodeCycleFindingAlgorithm";

describe('JohnsonsNodeCycleFindingAlgorithm', ()=> {
    let johnson;

    before(() => {
        johnson = new JohnsonsNodeCycleFindingAlgorithm();
    });

    it('should find the whole graph as a single cycle in the simplest case: k3 (one cycle per starting node)', () => {
        //Create vertices 0-7
        let vertices = [0, 1, 2].map(function (i) {
            return new BasicVertex(i.toString(), i.toString());
        });

        //Create some edges such that we know the shortest path between them
        //Create a path from 0 to 7
        //Then create a shortcut along that path
        let edges = [
            new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
            new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
            new BasicEdge(vertices[2], vertices[0], 'id_edge_3', 'label_edge'),
        ];

        //Create the graph
        let graph = new BasicGraph(vertices, edges);

        //Find the path subgraph
        let paths = johnson.findPaths(graph, vertices[0]);

        //There should be one
        expect(paths.length).to.equal(1);

        //There should be one node per path
        paths.forEach(path => {
            expect(path.getEdges().length).to.equal(3);
        })
    });

    it('should find one cycle that is the whole graph in a 4-cycle (starting at node 0)', () => {
        //Create vertices 0-7
        let vertices = [0, 1, 2, 3].map(function (i) {
            return new BasicVertex(i.toString(), i.toString());
        });

        //Create some edges such that we know the shortest path between them
        //Create a path from 0 to 7
        //Then create a shortcut along that path
        let edges = [
            new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
            new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
            new BasicEdge(vertices[2], vertices[3], 'id_edge_3', 'label_edge'),
            new BasicEdge(vertices[3], vertices[0], 'id_edge_3', 'label_edge'),
        ];

        //Create the graph
        let graph = new BasicGraph(vertices, edges);

        //Find the path subgraph
        let paths = johnson.findPaths(graph, vertices[0]);

        //There should be one path
        expect(paths.length).to.equal(1);

        //There should be four nodes per path
        paths.forEach(path => {
            expect(path.getEdges().length).to.equal(4);
        })
    });

    it('should find one cycle that is the in two 4-cycle graphs (one start node on disjoint subgraph)', () => {
        //Create vertices 0-7
        let vertices = [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) {
            return new BasicVertex(i.toString(), i.toString());
        });

        //Create some edges such that we know the shortest path between them
        //Create a path from 0 to 7
        //Then create a shortcut along that path
        let edges = [
            new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
            new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
            new BasicEdge(vertices[2], vertices[3], 'id_edge_3', 'label_edge'),
            new BasicEdge(vertices[3], vertices[0], 'id_edge_3', 'label_edge'),

            new BasicEdge(vertices[4], vertices[5], 'id_edge_4', 'label_edge'),
            new BasicEdge(vertices[5], vertices[6], 'id_edge_5', 'label_edge'),
            new BasicEdge(vertices[6], vertices[7], 'id_edge_6', 'label_edge'),
            new BasicEdge(vertices[7], vertices[4], 'id_edge_7', 'label_edge'),
        ];

        //Create the graph
        let graph = new BasicGraph(vertices, edges);

        //Find the path subgraph
        let paths = johnson.findPaths(graph, vertices[0]);

        //There should be four paths
        expect(paths.length).to.equal(1);

        //There should be four nodes per path
        paths.forEach(path => {
            expect(path.getEdges().length).to.equal(4);
        })
    });

    it('should find two cycles that are the in a special 5-node graph when starting from a single vertex', () => {
        //Create vertices 0-7
        let vertices = [0, 1, 2, 3, 4].map(function (i) {
            return new BasicVertex(i.toString(), i.toString());
        });

        //Create some edges such that we know the shortest path between them
        //Create a path from 0 to 7
        //Then create a shortcut along that path
        let edges = [
            new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
            new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
            new BasicEdge(vertices[2], vertices[3], 'id_edge_3', 'label_edge'),
            new BasicEdge(vertices[3], vertices[0], 'id_edge_3', 'label_edge'),

            new BasicEdge(vertices[0], vertices[4], 'id_edge_4', 'label_edge'),
            new BasicEdge(vertices[4], vertices[3], 'id_edge_5', 'label_edge'),
        ];

        //Create the graph
        let graph = new BasicGraph(vertices, edges);

        //Find the path subgraph
        let paths = johnson.findPaths(graph, vertices[0]);

        //There should be four paths
        expect(paths.length).to.equal(2);
    });
});