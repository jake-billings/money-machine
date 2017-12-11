import {DijikstrasShortestPathFindingAlgorithm} from "../GraphAlgorithms/DijikstrasShortestPathFindingAlgorithm";
import {TimeCostFunction} from "../FinancialGraphs/FinancialCostFunctions/TimeCostFunction";
import {buildGraph, charlesSchwabUsd, gdaxEth} from "./ExampleModel";
import {ArbitrageSearchAlgorithm} from "../FinancialGraphAlgorithms/ArbitrageSearchAlgorithm";
import {JohnsonsCycleFindingAlgorithm} from "../GraphAlgorithms/JohnsonsCycleFindingAlgorithm";
import {SimpleArbitrageSearchAlgorithm} from "../FinancialGraphAlgorithms/SimpleArbitrageSearchAlgorithm";
import {DefaultArbitrageSearchAlgorithm} from "../FinancialGraphAlgorithms/DefaultArbitrageSearchAlgorithm";

const express = require('express');

/**
 * startServer()
 *
 * Starts a demo server on the provided port. The demo server uses the financial model from ExampleModel. It provides
 * RESTful endpoints that expose graphs to a frontend javascript visualization library.
 *
 * This server is intended for demo purposes only.
 *
 * @param {number} port The port to start the server on
 */
export function startServer(port: number) {
    //Init an express app
    const app = express();

    //Load the financial model asynchronously; the endpoint will handle it if it hasn't loaded yet
    let graph;
    buildGraph().then(g=>{
        graph=g;
    });
    app.get('/api/graph', function (req, res) {
        if (!graph) return res.send({edges:[],vertices:[],message:'Financial graph model has not loaded yet. Be patient.'});
        return res.send(graph.serialize());
    });

    //Test dijkstra by finding the fastest way to transfer gdaxEth to schwab usd
    app.get('/api/testDijkstra', function (req, res) {
        let d = new DijikstrasShortestPathFindingAlgorithm(new TimeCostFunction());

        let path = d.findPath(gdaxEth, charlesSchwabUsd, graph);

        if (!path) return res.send('null');
        return res.send(path.serialize());
    });

    app.get('/api/testArbitrage', function (req, res) {
        let d = new DefaultArbitrageSearchAlgorithm();

        let paths = d.findPaths(graph);

        if (!paths) return res.send('null');
        return res.send(paths.map(path=>path.serialize()));
    });

    //Serve the frontend to anybody who asks
    app.use('/', express.static('frontend'));
    app.use('/node_modules', express.static('node_modules'));

    //Start the Express server
    app.listen(port, function () {
        console.info(`Listening on port ${port}`);
    });
}