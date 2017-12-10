import {expect} from 'chai';
import {CurrencyBTC} from "../../backend/Currencies/CurrencyBTC";

describe('CurrencyBTC', () => {
    it('should have the symbol BTC', () => {
        let btc = new CurrencyBTC();
        expect(btc.getSymbol()).to.equal('BTC');
    })
});