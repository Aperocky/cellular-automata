import { Grid } from '../../src/grid/grid';
import { Configuration } from '../../src/parser/configuration';
import parse from '../../src/parser/parser';
import { CONWAY_CONDITIONS } from '../parser/parserTest';
import { expect } from 'chai';


const TEST_GRID_1 = [
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 0]
]

const TEST_GRID_1_CONWAY_UPDATE = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
]

describe('grid:Grid', () => {

    it('test initiatialization', () => {
        let grid = new Grid(10);
        expect(grid.grid.length).to.equal(10);
        expect(grid.grid[0].length).to.equal(10);
        expect(grid.grid[9].length).to.equal(10);
        grid.grid.map(arr => arr.map(e => expect(e).to.equal(0)));
    });

    it('test initial condition', () => {
        let grid = new Grid(10);
        let inputString = JSON.stringify({
            "InitialCondition": "1 0.5"
        });
        let config = parse(inputString);
        grid.createInitialCondition(config);
        let gridSum = [].concat(...grid.grid).filter(e => e == 1).length;
        expect(gridSum > 20).to.be.true;
        expect(grid.previousGrid).to.eql(new Grid(10).grid);
    });

    it('test conway condition in updateGrid', () => {
        let inputString = JSON.stringify(CONWAY_CONDITIONS);
        let config = parse(inputString);
        let grid = new Grid(3);
        grid.grid = TEST_GRID_1;
        grid.updateGrid(config);
        expect(grid.grid).to.eql(TEST_GRID_1_CONWAY_UPDATE);
        expect(grid.previousGrid).to.eql(TEST_GRID_1);
    });

    it('test change set', () => {
        let inputString = JSON.stringify(CONWAY_CONDITIONS);
        let config = parse(inputString);
        let grid = new Grid(3);
        grid.grid = TEST_GRID_1;
        grid.updateGrid(config);
        let changeSet = grid.getChangeSet(config);
        expect(changeSet.size).to.equal(5);
        let testLoc = JSON.stringify({x: 0, y: 1});
        expect(changeSet.has(testLoc)).to.be.true;
        expect(changeSet.get(testLoc)).to.equal("cyan");
    });
});
