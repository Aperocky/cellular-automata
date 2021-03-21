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
        expect(config.initialCondition.conditionType).to.equal("NONE");
        expect(config.initialCondition.target).to.equal(0);
        expect(config.initialCondition.chance).to.equal(0);
    });

    it('test initial conditions', () => {
        let inputString = JSON.stringify({
            "initialcondition": "1 0.5"
        });
        let config = parse(inputString);
        expect(config.initialCondition.conditionType).to.equal("DEFAULT");
        expect(config.initialCondition.target).to.equal(1);
        expect(config.initialCondition.chance).to.equal(0.5);
        expect(config.funcMap).to.be.empty;
        expect(config.colorMap.size).to.equal(8);

        inputString = JSON.stringify({
            "initialcondition": "CornerDot 2"
        });
        config = parse(inputString);
        expect(config.initialCondition.conditionType).to.equal("CORNER_DOT");
        expect(config.initialCondition.target).to.equal(2);
        expect(config.initialCondition.chance).to.equal(1);

        inputString = JSON.stringify({
            "initialcondition": "CentralSquare 1"
        });
        config = parse(inputString);
        expect(config.initialCondition.conditionType).to.equal("CENTRAL_SQUARE");
        expect(config.initialCondition.target).to.equal(1);
        expect(config.initialCondition.chance).to.equal(1);
    });

    it('test parsing colorMap', () => {
        let inputString = JSON.stringify({
            "initialcondition": "1 0.5",
            "colormap": {
                "0": "blue",
                "1": "red"
            }
        });
        let config = parse(inputString);
        expect(config.colorMap.get(0)).to.equal("blue");
        expect(config.colorMap.get(1)).to.equal("red");
        expect(config.colorMap.get(2)).to.equal(undefined);
    })

    it('test conway conditions', () => {
        let inputString = JSON.stringify(CONWAY_CONDITIONS);
        let config = parse(inputString);
        expect(config.initialCondition.conditionType).to.equal("DEFAULT");
        expect(config.initialCondition.target).to.equal(1);
        expect(config.initialCondition.chance).to.equal(0.2);
        expect(config.funcMap.get(0).length).to.equal(2);
        expect(config.funcMap.get(1).length).to.equal(2);
    });
});
