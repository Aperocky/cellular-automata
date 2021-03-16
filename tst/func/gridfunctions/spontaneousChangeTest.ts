import { spontaneousChange } from '../../../src/func/gridFunctions/spontaneousChange';
import { Location } from '../../../src/grid/gridUtil';
import { Grid } from '../../../src/grid/grid';
import { expect } from 'chai';

const TEST_GRID_1 = [
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 0]
]

describe('func:SpontaneousChange', () => {

    it('test 100% change', () => {
        let args = ["1", "1"];
        let parameterizedFunc = spontaneousChange.getParameterizedFunc(...args);
        let location: Location = { x: 1, y: 0 };
        let grid = new Grid(3);
        grid.grid = TEST_GRID_1;
        expect(parameterizedFunc(grid, location)).to.equal(1);
        location = { x: 0, y: 0 };
        expect(parameterizedFunc(grid, location)).to.equal(1);
        location = { x: 0, y: 1 };
        expect(parameterizedFunc(grid, location)).to.equal(1);
        location = { x: 2, y: 2 };
        expect(parameterizedFunc(grid, location)).to.equal(1);
    });

    it('test bad parameter', () => {
        let args = ["1", "1.05"];
        expect(() => spontaneousChange.getParameterizedFunc(...args)).to.throw("Parameter chance of SpontaneousChange must be between 0 and 1");
    })
});
