import {DijikstrasShortestPathFindingAlgorithm} from "../GraphAlgorithms/DijikstrasShortestPathFindingAlgorithm";
import {TimeCostFunction} from "../FinancialGraphs/FinancialCostFunctions/TimeCostFunction";
import {DefaultArbitrageSearchAlgorithm} from "../FinancialGraphAlgorithms/DefaultArbitrageSearchAlgorithm";
import {exampleModelGraph, gdaxStream} from "./ExampleModel";

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

    app.get('/api/graph', function (req, res) {
        if (!exampleModelGraph) return res.send({edges:[],vertices:[],message:'Financial graph model has not loaded yet. Be patient.'});
        return res.send(exampleModelGraph.serialize());
    });

    app.get('/api/testArbitrage', function (req, res) {
        let d = new DefaultArbitrageSearchAlgorithm();

        let paths = d.findPaths(exampleModelGraph);

        if (!paths) return res.send('null');
        return res.send(paths.map(path=>path.serialize()));
    });

    app.get('/api/tickers', function (req, res) {
        return res.send(gdaxStream.getTickers());
    });

    //Serve the frontend to anybody who asks
    app.use('/', express.static('frontend'));
    app.use('/node_modules', express.static('node_modules'));

    //Start the Express server
    app.listen(port, function () {
        console.info(`Listening on port ${port}`);
    });
}