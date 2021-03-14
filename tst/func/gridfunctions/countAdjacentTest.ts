import { countAdjacent } from '../../../src/func/gridFunctions/countAdjacent';
import { Location } from '../../../src/grid/gridUtil';
import { expect } from 'chai';

const TEST_GRID_1 = [
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 0]
]

const TEST_GRID_2 = [
    [1, 0, 0],
    [0, 1, 1],
    [1, 0, 0]
]

describe('func:CountAdjacent', () => {

    it('test countAdjacent init', () => {
        let args = ["le", "1", "2", "1"];
        let parameterizedFunc = countAdjacent.getParameterizedFunc(...args);
    });

    it('test bad parameter', () => {
        let args = ["fe", "1", "3", "1"];
        expect(() => countAdjacent.getParameterizedFunc(...args)).to.throw("Comparison-operator fe is not supported");
        args = ["le", "biek", "2", "0"];
        expect(() => countAdjacent.getParameterizedFunc(...args)).to.throw("Parameter target, threshold, destination of countAdjacent must be integer");
    })

    it('test countAdjacent le', () => {
        let args = ["le", "1", "2", "1"];
        let parameterizedFunc = countAdjacent.getParameterizedFunc(...args);
        let location: Location = { x: 1, y: 1 };
        expect(parameterizedFunc(TEST_GRID_1, location)).to.equal(1);
        expect(parameterizedFunc(TEST_GRID_2, location)).to.equal(1);
        location = { x: 0, y: 0 };
        expect(parameterizedFunc(TEST_GRID_1, location)).to.equal(1);
        expect(parameterizedFunc(TEST_GRID_2, location)).to.equal(1);
        location = { x: 0, y: 1 };
        expect(parameterizedFunc(TEST_GRID_1, location)).to.equal(0);
    });

    it('test countAdjacent gt', () => {
        let args = ["gt", "1", "2", "0"];
        let parameterizedFunc = countAdjacent.getParameterizedFunc(...args);
        let location: Location = { x: 1, y: 1 };
        expect(parameterizedFunc(TEST_GRID_2, location)).to.equal(0);
        location = { x: 0, y: 0 };
        expect(parameterizedFunc(TEST_GRID_2, location)).to.equal(1);
        location = { x: 1, y: 2 };
        expect(parameterizedFunc(TEST_GRID_2, location)).to.equal(0);
        location = { x: 2, y: 0 };
        expect(parameterizedFunc(TEST_GRID_2, location)).to.equal(0);
    });
});
