import { expect } from 'chai';
import {CurrencyETH} from "../../backend/Currencies/CurrencyETH";

describe('CurrencyETH', () => {
    it('should have the symbol ETH', () => {
        let eth = new CurrencyETH();
        expect(eth.getSymbol()).to.equal('ETH');
    })
});