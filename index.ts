import {startServer} from "./backend/Server/Server";
import {exampleModelGraph} from "./backend/Server/ExampleModel";
import {DefaultArbitrageSearchAlgorithm} from "./backend/FinancialGraphAlgorithms/DefaultArbitrageSearchAlgorithm";
import {SimpleFinancialPathExecutionAlgorithm} from "./backend/FinancialGraphAlgorithms/SimpleFinancialPathExecutionAlgorithm";
import {CurrencyVertex} from "./backend/FinancialGraphs/CurrencyVertex";
import {TradeAuthorizer} from "./backend/Trading/TradeAuthorizer";
import {HumanInputTradeAuthorizer} from "./backend/Trading/HumanInputTradeAuthorizer";

startServer(3000);

exampleModelGraph.onLoad(() => {
    console.log('example model loaded')

    let d = new DefaultArbitrageSearchAlgorithm();

    let auth = new HumanInputTradeAuthorizer()

    let result = d.findBestPath(exampleModelGraph);

    console.log('best trade path result', result)

    result.getPath().getEdges().forEach(edge=>{
        console.log(edge.getFrom().getCurrency().getSymbol()+'->'+edge.getTo().getCurrency().getSymbol()+': '+edge.calculateEdgeOutcome(10000)/10000+' '+edge.getLabel())
    })

    if (result.getProfit()>0) {
    // if (true) {
        console.log('that path is profitable, so let\'s try and execute it.');

        let e = new SimpleFinancialPathExecutionAlgorithm(auth);

        e.execute(result.getPath(),
            result.getStartVertex(),
            result.getStartVertex().getStartAmountBps())
            .then(result=>{
                console.log('trade filled', result.getName(), result.getProfit())
            },err =>{
                console.log('trade failed', err)
            })
    } else {
        console.log('that path is not profitable, so let\'s not execute it.')
    }
});