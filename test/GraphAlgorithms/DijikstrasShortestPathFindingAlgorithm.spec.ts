import {expect} from 'chai';
import {BasicVertex} from "../../backend/BasicGraphs/BasicVertex";
import {BasicEdge} from "../../backend/BasicGraphs/BasicEdge";
import {BasicGraph} from "../../backend/BasicGraphs/BasicGraph";
import {DijikstrasShortestPathFindingAlgorithm} from "../../backend/GraphAlgorithms/DijikstrasShortestPathFindingAlgorithm";
import {EqualCostFunction} from "../../backend/GraphAlgorithms/CostFunctions/EqualCostFunction";

describe('DijikstrasShortestPathFindingAlgorithm', () => {
    describe('using EqualCostFunction', () => {
        let dijkstra;
        before(() => {
            dijkstra = new DijikstrasShortestPathFindingAlgorithm(new EqualCostFunction());
        });

        it('should find the only path when there is only one path', () => {
            //Create vertices 0-7
            let vertices = [0, 1, 3, 4, 5, 6, 7].map(function (i) {
                return new BasicVertex(i.toString(), i.toString());
            });

            //Create some edges such that we know the shortest path between them
            //Create a path from 0 to 7
            //Then create a shortcut along that path
            let edges = [
                new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
                new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
                new BasicEdge(vertices[2], vertices[3], 'id_edge_3', 'label_edge'),
                new BasicEdge(vertices[3], vertices[4], 'id_edge_4', 'label_edge'),
                new BasicEdge(vertices[4], vertices[5], 'id_edge_5', 'label_edge'),
                new BasicEdge(vertices[5], vertices[6], 'id_edge_6', 'label_edge')
            ];

            //Create the graph
            let graph = new BasicGraph(vertices, edges);

            //Find the path subgraph
            let path = dijkstra.findPath(vertices[0], vertices[6], graph);

            //Check that it is the correct path by checking length, contents, then precise values.
            let correctPath = edges;
            let correctLength = correctPath.length;
            let keyEdge = edges[3];

            expect(path.containsEdge(keyEdge)).to.be.true;
            expect(path.getEdges().length).to.equal(correctLength);

            let correctIds = correctPath.map(edge => {
                return edge.getId();
            });
            let actualIds = path.getEdges().map(edge => {
                return edge.getId();
            });

            expect(actualIds).to.deep.equal(correctIds);
        });
        it('should find the shortest path through a trail with a shortcut', () => {
            //Create vertices 0-7
            let vertices = [0, 1, 3, 4, 5, 6, 7].map(function (i) {
                return new BasicVertex(i.toString(), i.toString());
            });

            //Create some edges such that we know the shortest path between them
            //Create a path from 0 to 7
            //Then create a shortcut along that path
            let edges = [
                new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
                new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
                new BasicEdge(vertices[2], vertices[3], 'id_edge_3', 'label_edge'),
                new BasicEdge(vertices[3], vertices[4], 'id_edge_4', 'label_edge'),
                new BasicEdge(vertices[4], vertices[5], 'id_edge_5', 'label_edge'),
                new BasicEdge(vertices[5], vertices[6], 'id_edge_6', 'label_edge'),

                new BasicEdge(vertices[2], vertices[5], 'id_edge_shortcut', 'label_edge') //Shortcut
            ];

            //Create the graph
            let graph = new BasicGraph(vertices, edges);

            //Find the path subgraph
            let path = dijkstra.findPath(vertices[0], vertices[6], graph);

            //Check that it is the correct path by checking length, contents, then precise values.
            let correctPath = [
                edges[0],
                edges[1],
                edges[6],
                edges[5]
            ];
            let correctLength = correctPath.length;
            let keyEdge = edges[6];

            expect(path.containsEdge(keyEdge)).to.be.true;
            expect(path.getEdges().length).to.equal(correctLength);

            let correctIds = correctPath.map(edge => {
                return edge.getId();
            });
            let actualIds = path.getEdges().map(edge => {
                return edge.getId();
            });

            expect(actualIds).to.deep.equal(correctIds);
        });
        it('should find the shortest path through a trail with a shortcut and loops', () => {
            //Create vertices 0-7
            let vertices = [0, 1, 3, 4, 5, 6, 7].map(function (i) {
                return new BasicVertex(i.toString(), i.toString());
            });

            //Create some edges such that we know the shortest path between them
            //Create a path from 0 to 7
            //Then create a shortcut along that path
            let edges = [
                new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
                new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
                new BasicEdge(vertices[2], vertices[3], 'id_edge_3', 'label_edge'),
                new BasicEdge(vertices[3], vertices[4], 'id_edge_4', 'label_edge'),
                new BasicEdge(vertices[4], vertices[5], 'id_edge_5', 'label_edge'),
                new BasicEdge(vertices[5], vertices[6], 'id_edge_6', 'label_edge'),

                new BasicEdge(vertices[2], vertices[5], 'id_edge_shortcut', 'label_edge'), //Shortcut
                new BasicEdge(vertices[6], vertices[5], 'id_edge_a1', 'label_edge'),
                new BasicEdge(vertices[6], vertices[1], 'id_edge_a2', 'label_edge'),
                new BasicEdge(vertices[6], vertices[0], 'id_edge_a3', 'label_edge'),
                new BasicEdge(vertices[2], vertices[1], 'id_edge_a4', 'label_edge'),
                new BasicEdge(vertices[3], vertices[2], 'id_edge_a5', 'label_edge'),
                new BasicEdge(vertices[2], vertices[3], 'id_edge_a6', 'label_edge'),
            ];

            //Create the graph
            let graph = new BasicGraph(vertices, edges);

            //Find the path subgraph
            let path = dijkstra.findPath(vertices[0], vertices[6], graph);

            //Check that it is the correct path by checking length, contents, then precise values.
            let correctPath = [
                edges[0],
                edges[1],
                edges[6],
                edges[5]
            ];
            let correctLength = correctPath.length;
            let keyEdge = edges[6];

            expect(path.containsEdge(keyEdge)).to.be.true;
            expect(path.getEdges().length).to.equal(correctLength);

            let correctIds = correctPath.map(edge => {
                return edge.getId();
            });
            let actualIds = path.getEdges().map(edge => {
                return edge.getId();
            });

            expect(actualIds).to.deep.equal(correctIds);
        });

        it('should return an empty graph if no path is possible', () => {
            //Create vertices 0-7
            let vertices = [0, 1, 3, 4, 5, 6, 7].map(function (i) {
                return new BasicVertex(i.toString(), i.toString());
            });

            //Create some edges such that we know the shortest path between them
            //Create a path from 0 to 7
            //Then create a shortcut along that path
            let edges = [
                new BasicEdge(vertices[0], vertices[1], 'id_edge_1', 'label_edge'),
                new BasicEdge(vertices[1], vertices[2], 'id_edge_2', 'label_edge'),
                new BasicEdge(vertices[2], vertices[3], 'id_edge_3', 'label_edge'),
                // new BasicEdge(vertices[3], vertices[4], 'id_edge_4', 'label_edge'), - This would be required to make path
                new BasicEdge(vertices[4], vertices[5], 'id_edge_5', 'label_edge'),
                new BasicEdge(vertices[5], vertices[6], 'id_edge_6', 'label_edge')
            ];

            //Create the graph
            let graph = new BasicGraph(vertices, edges);

            //Find the path subgraph
            let path = dijkstra.findPath(vertices[0], vertices[6], graph);

            //Check that it is the correct path by checking length, contents, then precise values.
            let correctPath = [];
            let correctLength = correctPath.length;

            expect(path.getEdges().length).to.equal(correctLength);

            let correctIds = correctPath.map(edge => {
                return edge.getId();
            });
            let actualIds = path.getEdges().map(edge => {
                return edge.getId();
            });

            expect(actualIds).to.deep.equal(correctIds);
        });
    });
});