//Imports
import {KrakenExchange} from "../Exchanges/KrakenExchange";
import {CurrencyVertex} from "../FinancialGraphs/CurrencyVertex";
import {CurrencyUSD} from "../Currencies/CurrencyUSD";
import {CurrencyETH} from "../Currencies/CurrencyETH";
import {CurrencyBTC} from "../Currencies/CurrencyBTC";
import {KrakenEdgeFactory} from "../FinancialGraphs/KrakenEdgeFactory";
import {GdaxExchange} from "../Exchanges/GdaxExchange";
import {GdaxEdgeFactory} from "../FinancialGraphs/GdaxEdgeFactory";
import {Graph} from "../Graphs/Graph";
import {BankExchange} from "../Exchanges/BankExchange";
import {BankTransferEdgeFactory} from "../FinancialGraphs/BankTransferEdgeFactory";
import {CryptoTransferEdgeFactory} from "../FinancialGraphs/CryptoTransferEdgeFactory";
import {BasicGraph} from "../BasicGraphs/BasicGraph";

//Time constants
export const ONE_SECOND = 1;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export const THREE_DAYS = 3 * ONE_DAY;

export const BTC_CONFIRMATION_TIME = ONE_MINUTE * 70; //~60 minutes, but let's use 70 to be sage
export const ETH_CONFIRMATION_TIME = ONE_SECOND * 20; //~14 seconds, but let's use 14 to be safe
export const WIRE_CONFIRMATION_TIME = ONE_HOUR * 48; //~24 hours, but let's use 48 to be safe
export const ACH_CONFIRMATION_TIME = ONE_DAY * 5; //~4 days, but let's use 5 to be safe; ACH transfers are really slow

export const ETH_TRANSACTION_FEE_BPS = 26; //~$1.20 to be safe
export const BTC_TRANSACTION_FEE_BPS = 14; //~$22 to be safe

//Initialize Currencies
export const usd = new CurrencyUSD();
export const eth = new CurrencyETH();
export const btc = new CurrencyBTC();

//Initialize Banks
export const wellsFargo = new BankExchange('Wells Fargo', usd);
export const charlesSchwab = new BankExchange('Charles Schwab', usd);

//Initialize Exchanges
export const kraken = new KrakenExchange('public', 'public');
export const gdax = new GdaxExchange();

//Initialize Nodes
export const krakenUsd = new CurrencyVertex(usd, kraken);
export const krakenEth = new CurrencyVertex(eth, kraken);
export const krakenBtc = new CurrencyVertex(btc, kraken);
export const gdaxUsd = new CurrencyVertex(usd, gdax);
export const gdaxEth = new CurrencyVertex(eth, gdax);
export const gdaxBtc = new CurrencyVertex(btc, gdax);

export const wellsFargoUsd = new CurrencyVertex(usd, wellsFargo);
export const charlesSchwabUsd = new CurrencyVertex(usd, charlesSchwab);

export const vertices = [
    krakenUsd, krakenEth, krakenBtc,
    gdaxUsd, gdaxEth, gdaxBtc,
    wellsFargoUsd, charlesSchwabUsd
];

//Initialize Edge Factories
export const krakenUsdEthFactory = new KrakenEdgeFactory(kraken, krakenUsd, krakenEth, true);
export const krakenEthUsdFactory = new KrakenEdgeFactory(kraken, krakenEth, krakenUsd, false);
export const krakenUsdBtcFactory = new GdaxEdgeFactory(kraken, krakenUsd, krakenBtc, true);
export const krakenBtcUsdFactory = new GdaxEdgeFactory(kraken, krakenBtc, krakenUsd, false);
export const krakenEthBtcFactory = new GdaxEdgeFactory(kraken, krakenEth, krakenBtc, false);
export const krakenBtcEthFactory = new GdaxEdgeFactory(kraken, krakenBtc, krakenEth, true);

export const gdaxUsdEthFactory = new GdaxEdgeFactory(gdax, gdaxUsd, gdaxEth, true);
export const gdaxEthUsdFactory = new GdaxEdgeFactory(gdax, gdaxEth, gdaxUsd, false);
export const gdaxUsdBtcFactory = new GdaxEdgeFactory(gdax, gdaxUsd, gdaxBtc, true);
export const gdaxBtcUsdFactory = new GdaxEdgeFactory(gdax, gdaxBtc, gdaxUsd, false);
export const gdaxEthBtcFactory = new GdaxEdgeFactory(gdax, gdaxEth, gdaxBtc, false);
export const gdaxBtcEthFactory = new GdaxEdgeFactory(gdax, gdaxBtc, gdaxEth, true);

export const wellsFargoGdaxUsdFactory = new BankTransferEdgeFactory('ACH', wellsFargoUsd, gdaxUsd, 5, 5, ACH_CONFIRMATION_TIME);
export const gdaxWellsFargoUsdFactory = new BankTransferEdgeFactory('ACH', gdaxUsd, wellsFargoUsd, 5, 5, ACH_CONFIRMATION_TIME);
export const wellsFargoKrakenUsdFactory = new BankTransferEdgeFactory('WIRE', wellsFargoUsd, krakenUsd, 0, 25, WIRE_CONFIRMATION_TIME);
export const krakenWellsFargoUsdFactory = new BankTransferEdgeFactory('WIRE', krakenUsd, wellsFargoUsd, 15, 0, WIRE_CONFIRMATION_TIME);
export const wellsFargoCharlesSchwabUsdFactory = new BankTransferEdgeFactory('ACH', wellsFargoUsd, charlesSchwabUsd, 5, 5, ACH_CONFIRMATION_TIME);
export const charlesSchwabWellsFargoUsdFactory = new BankTransferEdgeFactory('ACH', charlesSchwabUsd, wellsFargoUsd, 5, 5, ACH_CONFIRMATION_TIME);

export const gdaxKrakenEth = new CryptoTransferEdgeFactory(gdaxEth, krakenEth, ETH_TRANSACTION_FEE_BPS, 0, ETH_CONFIRMATION_TIME);
export const krakenGdaxEth = new CryptoTransferEdgeFactory(krakenEth, gdaxEth, ETH_TRANSACTION_FEE_BPS, 0, ETH_CONFIRMATION_TIME);

export const gdaxKrakenBtc = new CryptoTransferEdgeFactory(gdaxBtc, krakenBtc, BTC_TRANSACTION_FEE_BPS, 0, BTC_CONFIRMATION_TIME);
export const krakenGdaxBtc = new CryptoTransferEdgeFactory(krakenBtc, gdaxBtc, BTC_TRANSACTION_FEE_BPS, 0, BTC_CONFIRMATION_TIME);

export const edgeFactories = [
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

/**
 * buildGraph()
 *
 * Returns a promise that will resolve to the complete financial graph model once all factories load live data
 *
 * @returns {Promise<Graph>} A promise of a complete financial graph model
 */
export function buildGraph() : Promise<Graph> {
    return new Promise<Graph>((resolve, reject)=>{
        //Initialize the graph
        let graph = new BasicGraph(vertices, []);

        //Collect any errors
        let errors = [];

        //Tell all the edge factories to load their data and make edges
        let edgePromises = edgeFactories.map(edgeFactory => {
            return edgeFactory.getEdge().then(edge => {
                //Add the edges to the graph when they load
                return graph.upsertEdge(edge);
            }, err => {
                return errors.push(err);
            });
        });

        //Resolve the main promise and handle any errors that occured
        return Promise.all(edgePromises).then(() => {
            if (errors.length>0) {
                return reject(errors);
            }
            return resolve(graph);
        },err=>{
            reject(err);
        })
    })
}
