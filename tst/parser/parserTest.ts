import { Configuration } from '../../src/parser/configuration';
import parse from '../../src/parser/parser';
import { expect } from 'chai';


export const CONWAY_CONDITIONS = {
    "InitialCondition": "1 0.2",
    "0": [
        "CountAdjacent eq 1 2 1",
        "CountAdjacent eq 1 3 1"
    ],
    "1": [
        "CountAdjacent lt 1 2 0",
        "CountAdjacent gt 1 3 0"
    ]
}

describe('parser:Parser', () => {

    it('test parsing empty configuration', () => {
        let inputString = JSON.stringify({});
        let config = parse(inputString);
        expect(config.funcMap).to.be.empty;
    });

    it('test initial conditions', () => {
        let inputString = JSON.stringify({
            "InitialCondition": "1 0.5"
        });
        let config = parse(inputString);
        expect(config.initialCondition).to.eql([1, 0.5])
        expect(config.funcMap).to.be.empty;
    })

    it('test conway conditions', () => {
        let inputString = JSON.stringify(CONWAY_CONDITIONS);
        let config = parse(inputString);
        expect(config.initialCondition).to.eql([1, 0.2]);
        expect(config.funcMap.get(0).length).to.equal(2);
        expect(config.funcMap.get(1).length).to.equal(2);
    });
});
