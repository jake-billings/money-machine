/**
 * Created by jakebillings on 12/7/17.
 */

//Imports
import {KrakenExchange} from "./Exchanges/KrakenExchange";
import {CurrencyVertex} from "./FinancialGraphs/CurrencyVertex";
import {CurrencyUSD} from "./Currencies/CurrencyUSD";
import {CurrencyETH} from "./Currencies/CurrencyETH";
import {CurrencyBTC} from "./Currencies/CurrencyBTC";
import {CurrencyEdgeFactory} from "./FinancialGraphs/CurrencyEdgeFactory";
import {KrakenEdgeFactory} from "./FinancialGraphs/KrakenEdgeFactory";
import {GdaxExchange} from "./Exchanges/GdaxExchange";
import {GdaxEdgeFactory} from "./FinancialGraphs/GdaxEdgeFactory";
import {Graph} from "./Graphs/Graph";
import {BankExchange} from "./Exchanges/BankExchange";
import {BankTransferEdgeFactory} from "./FinancialGraphs/BankTransferEdgeFactory";
import {CryptoTransferEdgeFactory} from "./FinancialGraphs/CryptoTransferEdgeFactory";

//Time constants
const ONE_SECOND = 1;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const THREE_DAYS = 3 * ONE_DAY;

//Initialize Banks
let wellsFargo = new BankExchange('Wells Fargo');
let charlesSchwab = new BankExchange('Charles Schwab');

//Initialize Exchanges
let kraken = new KrakenExchange('public','public');
let gdax = new GdaxExchange();


//Initialize Currencies
let usd = new CurrencyUSD();
let eth = new CurrencyETH();
let btc = new CurrencyBTC();


//Initialize Nodes
let krakenUsd = new CurrencyVertex(usd, kraken);
let krakenEth = new CurrencyVertex(eth, kraken);
let krakenBtc = new CurrencyVertex(btc, kraken);
let gdaxUsd = new CurrencyVertex(usd, gdax);
let gdaxEth = new CurrencyVertex(eth, gdax);
let gdaxBtc = new CurrencyVertex(btc, gdax);

let wellsFargoUsd = new CurrencyVertex(usd, wellsFargo);
let charlesSchwabUsd = new CurrencyVertex(usd, charlesSchwab);

let vertices = [
    krakenUsd, krakenEth, krakenBtc,
    gdaxUsd, gdaxEth, gdaxBtc,
    wellsFargoUsd, charlesSchwabUsd
];

//Initialize Edge Factories
let krakenUsdEthFactory = new KrakenEdgeFactory(kraken, krakenUsd, krakenEth, true);
let krakenEthUsdFactory = new KrakenEdgeFactory(kraken, krakenEth, krakenUsd, false);
let krakenUsdBtcFactory = new GdaxEdgeFactory(kraken, krakenUsd, krakenBtc, true);
let krakenBtcUsdFactory = new GdaxEdgeFactory(kraken, krakenBtc, krakenUsd, false);
let krakenEthBtcFactory = new GdaxEdgeFactory(kraken, krakenEth, krakenBtc, false);
let krakenBtcEthFactory = new GdaxEdgeFactory(kraken, krakenBtc, krakenEth, true);

let gdaxUsdEthFactory = new GdaxEdgeFactory(gdax, gdaxUsd, gdaxEth, true);
let gdaxEthUsdFactory = new GdaxEdgeFactory(gdax, gdaxEth, gdaxUsd, false);
let gdaxUsdBtcFactory = new GdaxEdgeFactory(gdax, gdaxUsd, gdaxBtc, true);
let gdaxBtcUsdFactory = new GdaxEdgeFactory(gdax, gdaxBtc, gdaxUsd, false);
let gdaxEthBtcFactory = new GdaxEdgeFactory(gdax, gdaxEth, gdaxBtc, false);
let gdaxBtcEthFactory = new GdaxEdgeFactory(gdax, gdaxBtc, gdaxEth, true);

let wellsFargoGdaxUsdFactory = new BankTransferEdgeFactory('ACH', wellsFargoUsd, gdaxUsd, 0, 0, THREE_DAYS);
let gdaxWellsFargoUsdFactory = new BankTransferEdgeFactory('ACH', gdaxUsd, wellsFargoUsd, 0, 0, THREE_DAYS);
let wellsFargoKrakenUsdFactory = new BankTransferEdgeFactory('WIRE', wellsFargoUsd, krakenUsd, 0, 25, ONE_DAY);
let krakenWellsFargoUsdFactory = new BankTransferEdgeFactory('WIRE', krakenUsd, wellsFargoUsd, 15, 0, ONE_DAY);
let wellsFargoCharlesSchwabUsdFactory = new BankTransferEdgeFactory('ACH', wellsFargoUsd, charlesSchwabUsd, 0, 0, THREE_DAYS);
let charlesSchwabWellsFargoUsdFactory = new BankTransferEdgeFactory('ACH', charlesSchwabUsd, wellsFargoUsd, 0, 0, THREE_DAYS);

let gdaxKrakenEth = new CryptoTransferEdgeFactory(gdaxEth, krakenEth, 0, 0, ONE_MINUTE);
let krakenGdaxEth = new CryptoTransferEdgeFactory(krakenEth, gdaxEth, 0, 0, ONE_MINUTE);
let gdaxKrakenBtc = new CryptoTransferEdgeFactory(gdaxBtc, krakenBtc, 0, 0, ONE_HOUR);
let krakenGdaxBtc = new CryptoTransferEdgeFactory(krakenBtc, gdaxBtc, 0, 0, ONE_HOUR);

let edgeFactories = [
    krakenUsdEthFactory,
    krakenEthUsdFactory,
    krakenUsdBtcFactory,
    krakenBtcUsdFactory,
    krakenEthBtcFactory,
    krakenBtcEthFactory,
    gdaxUsdEthFactory,
    gdaxEthUsdFactory,
    gdaxUsdBtcFactory,
    gdaxBtcUsdFactory,
    gdaxEthBtcFactory,
    gdaxBtcEthFactory,
    wellsFargoGdaxUsdFactory,
    gdaxWellsFargoUsdFactory,
    wellsFargoCharlesSchwabUsdFactory,
    charlesSchwabWellsFargoUsdFactory,
    wellsFargoKrakenUsdFactory,
    krakenWellsFargoUsdFactory,
    gdaxKrakenEth,
    krakenGdaxEth,
    gdaxKrakenBtc,
    krakenGdaxBtc
];

let graph = new Graph(vertices,[]);

edgeFactories.forEach(edgeFactory => {
    edgeFactory.getEdge().then(edge => {
        console.log(edge, edge.getRateBps()/10000);
        graph.upsertEdge(edge);
    }, err => {
        console.error('error:', err)
    });
});


//Server
const express = require('express');
const app = express();

app.get('/api/graph', function (req, res) {
    return res.send(graph.serialize());
});
app.use('/', express.static('public'));

app.listen(3000, function () {
    console.info('Listening on port 3000');
});