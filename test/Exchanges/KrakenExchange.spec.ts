import {expect} from 'chai';
import {KrakenExchange} from "../../backend/Exchanges/KrakenExchange";

describe('GdaxExchange', () => {
    let a;
    before(() => {
        a = new KrakenExchange('testkey','testsecret');
    });
    it('should have the name Kraken', () => {
        expect(a.getName()).to.equal('Kraken');
    });
    it('should store key', () => {
        expect(a.getKey()).to.equal('testkey');
    });
    it('should store secret', () => {
        expect(a.getSecret()).to.equal('testsecret');
    });
});