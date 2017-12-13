//Imports
import {KrakenExchange} from "../Exchanges/KrakenExchange";
import {CurrencyVertex} from "../FinancialGraphs/CurrencyVertex";
import {CurrencyUSD} from "../Currencies/CurrencyUSD";
import {CurrencyETH} from "../Currencies/CurrencyETH";
import {CurrencyBTC} from "../Currencies/CurrencyBTC";
import {CurrencyLTC} from "../Currencies/CurrencyLTC";
import {GdaxExchange} from "../Exchanges/GdaxExchange";
import {BankExchange} from "../Exchanges/BankExchange";
import {GdaxCurrencyEdge} from "../FinancialGraphs/GdaxCurrencyEdge";
import {GdaxStream} from "../Data/GdaxStream";
import {FinancialGraph} from "../FinancialGraphs/FinancialGraph";

//Time constants
export const ONE_SECOND = 1;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export const THREE_DAYS = 3 * ONE_DAY;

export const BTC_CONFIRMATION_TIME = ONE_MINUTE * 70; //~60 minutes, but let's use 70 to be safe
export const ETH_CONFIRMATION_TIME = ONE_SECOND * 20; //~14 seconds, but let's use 14 to be safe
export const WIRE_CONFIRMATION_TIME = ONE_HOUR * 48; //~24 hours, but let's use 48 to be safe
export const ACH_CONFIRMATION_TIME = ONE_DAY * 5; //~4 days, but let's use 5 to be safe; ACH transfers are really slow

export const ETH_TRANSACTION_FEE_BPS = 26; //~$1.20 to be safe
export const BTC_TRANSACTION_FEE_BPS = 14; //~$22 to be safe

//Initialize Currencies
export const usd = new CurrencyUSD();
export const eth = new CurrencyETH();
export const btc = new CurrencyBTC();
export const ltc = new CurrencyLTC();

//Initialize Banks
export const wellsFargo = new BankExchange('Wells Fargo', usd);
export const charlesSchwab = new BankExchange('Charles Schwab', usd);

//Initialize Exchanges
export const kraken = new KrakenExchange('public', 'public');
export const gdax = new GdaxExchange();

//Initialize Vertices
export const gdaxUsd = new CurrencyVertex(usd, gdax, 10000000); //$1,000
export const gdaxEth = new CurrencyVertex(eth, gdax, 15625); //~$1,000
export const gdaxBtc = new CurrencyVertex(btc, gdax, 588); //~$1,000
export const gdaxLtc = new CurrencyVertex(ltc, gdax, 25000); //~$1,000

export const wellsFargoUsd = new CurrencyVertex(usd, wellsFargo, 10000000); //$1000
export const charlesSchwabUsd = new CurrencyVertex(usd, charlesSchwab, 10000000); //$1000

export const vertices = [
    gdaxUsd, gdaxEth, gdaxBtc, gdaxLtc,
    wellsFargoUsd, charlesSchwabUsd
];

//Initialize Live Exchange Data
export const gdaxStream = new GdaxStream([
    //USD markets
    'ETH-USD',
    'BTC-USD',
    'LTC-USD',

    //Btc markets
    'ETH-BTC',
    'LTC-BTC'
]);

//Initialize Edges
export const gdaxUsdEth = new GdaxCurrencyEdge(gdaxUsd, gdaxEth, gdaxStream, false);
export const gdaxEthUsd = new GdaxCurrencyEdge(gdaxEth, gdaxUsd, gdaxStream, true);
export const gdaxUsdBtc = new GdaxCurrencyEdge(gdaxUsd, gdaxBtc, gdaxStream, false);
export const gdaxBtcUsd = new GdaxCurrencyEdge(gdaxBtc, gdaxUsd, gdaxStream, true);
export const gdaxUsdLtc = new GdaxCurrencyEdge(gdaxUsd, gdaxLtc, gdaxStream, false);
export const gdaxLtcUsd = new GdaxCurrencyEdge(gdaxLtc, gdaxUsd, gdaxStream, true);

export const gdaxBtcEth = new GdaxCurrencyEdge(gdaxBtc, gdaxEth, gdaxStream, false);
export const gdaxEthBtc = new GdaxCurrencyEdge(gdaxEth, gdaxBtc, gdaxStream, true);
export const gdaxBtcLtc = new GdaxCurrencyEdge(gdaxBtc, gdaxLtc, gdaxStream, false);
export const gdaxLtcBtc = new GdaxCurrencyEdge(gdaxLtc, gdaxBtc, gdaxStream, true);

// export const wellsFargoGdaxUsd = new BankTransferEdge('ACH',wellsFargoUsd, gdaxUsd, 5, 5, ACH_CONFIRMATION_TIME);
// export const gdaxWellsFargoUsd = new BankTransferEdge('ACH', gdaxUsd, wellsFargoUsd, 5, 5, ACH_CONFIRMATION_TIME);
// export const wellsFargoKrakenUsd = new BankTransferEdge('WIRE', wellsFargoUsd, krakenUsd, 0, 25, WIRE_CONFIRMATION_TIME);
// export const krakenWellsFargoUsd = new BankTransferEdge('WIRE', krakenUsd, wellsFargoUsd, 15, 0, WIRE_CONFIRMATION_TIME);
// export const wellsFargoCharlesSchwabUsd = new BankTransferEdge('ACH', wellsFargoUsd, charlesSchwabUsd, 5, 5, ACH_CONFIRMATION_TIME);
// export const charlesSchwabWellsFargoUsd = new BankTransferEdge('ACH', charlesSchwabUsd, wellsFargoUsd, 5, 5, ACH_CONFIRMATION_TIME);

// export const gdaxKrakenEth = new CryptoTransferEdge(gdaxEth, krakenEth, ETH_TRANSACTION_FEE_BPS, 0, ETH_CONFIRMATION_TIME);
// export const krakenGdaxEth = new CryptoTransferEdge(krakenEth, gdaxEth, ETH_TRANSACTION_FEE_BPS, 0, ETH_CONFIRMATION_TIME);
//
// export const gdaxKrakenBtc = new CryptoTransferEdge(gdaxBtc, krakenBtc, BTC_TRANSACTION_FEE_BPS, 0, BTC_CONFIRMATION_TIME);
// export const krakenGdaxBtc = new CryptoTransferEdge(krakenBtc, gdaxBtc, BTC_TRANSACTION_FEE_BPS, 0, BTC_CONFIRMATION_TIME);

export const edges = [
    gdaxUsdEth,
    gdaxEthUsd,
    gdaxUsdBtc,
    gdaxBtcUsd,
    gdaxEthBtc,
    gdaxLtcUsd,
    gdaxUsdLtc,
    gdaxBtcEth,
    gdaxLtcBtc,
    gdaxBtcLtc
];

export const loaders = [
    gdaxStream
];

export const exampleModelGraph = new FinancialGraph(vertices, edges, loaders);