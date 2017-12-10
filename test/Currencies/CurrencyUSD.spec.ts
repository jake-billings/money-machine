import { expect } from 'chai';
import {CurrencyUSD} from "../../backend/Currencies/CurrencyUSD";

describe('CurrencyUSD', () => {
    it('should have the symbol USD', () => {
        let usd = new CurrencyUSD();
        expect(usd.getSymbol()).to.equal('USD');
    })
});