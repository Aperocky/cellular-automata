import { changeByBlockAge } from '../../../src/func/gridFunctions/changeByBlockAge';
import { Location } from '../../../src/grid/gridUtil';
import { Grid } from '../../../src/grid/grid';
import { expect } from 'chai';


const TEST_GRID_1 = [
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 0]
]

const GRID_AGE = [
    [0, 0, 0],
    [0, 6, 9],
    [0, 0, 0]
]

describe('func:ChangeByBlockAge', () => {

    it('test changeByBlockAge', () => {
        let args = ["gt", "5", "2", "1"];
        let parameterizedFunc = changeByBlockAge.getParameterizedFunc(...args);
        let location: Location = { x: 1, y: 1 };
        let grid = new Grid(3);
        grid.grid = TEST_GRID_1;
        grid.gridAge = GRID_AGE;
        expect(parameterizedFunc(grid, location)).to.equal(2);
        location = { x: 0, y: 0 };
        expect(parameterizedFunc(grid, location)).to.equal(1);
        location = { x: 0, y: 1 };
        expect(parameterizedFunc(grid, location)).to.equal(0);
    });
});
