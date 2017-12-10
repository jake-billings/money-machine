import {expect} from 'chai';
import {GdaxExchange} from "../../backend/Exchanges/GdaxExchange";

describe('GdaxExchange', () => {
    let a;
    before(() => {
        a = new GdaxExchange();
    });
    it('should have the name GDAX', () => {
        expect(a.getName()).to.equal('GDAX');
    });
});