// Backend representation of cellular automata.
import { Configuration } from '../parser/configuration';
import { ParameterizedFunction } from '../func/gridFunction';
import { getLocString } from './gridUtil';


export class Grid {

    size: number;
    grid: number[][];
    gridAge: number[][];
    previousGrid: number[][];

    constructor(size: number) {
        this.size = size;
        this.grid = Array.apply(null, new Array(size)).map(e => Array(10).fill(0));
        this.gridAge = Array.apply(null, new Array(size)).map(e => Array(10).fill(0));
        this.previousGrid = JSON.parse(JSON.stringify(this.grid));
    }

    createInitialCondition(config: Configuration): void {
        this.previousGrid = JSON.parse(JSON.stringify(this.grid));
        for (let y=0; y<this.size; y++) {
            for (let x=0; x<this.size; x++) {
                this.grid[y][x] = 0;
            }
        }
        if (config.initialCondition === undefined) {
            return;
        }
        for (let y=0; y<this.size; y++) {
            for (let x=0; x<this.size; x++) {
                if (Math.random() < config.initialCondition[1]) {
                    this.grid[y][x] = config.initialCondition[0];
                }
            }
        }
    }

    updateGrid(config: Configuration): void {
        let gridCopy = JSON.parse(JSON.stringify(this.grid));
        for (let y=0; y<this.size; y++) {
            for (let x=0; x<this.size; x++) {
                this.gridAge[y][x] += 1;
                let currNum = this.grid[y][x];
                if (!config.funcMap.has(currNum)) {
                    continue;
                }
                let paramFuncs: ParameterizedFunction[] = config.funcMap.get(currNum);
                for (let i=0; i<paramFuncs.length; i++) {
                    let currResult = paramFuncs[i](this, {x: x, y: y});
                    if (currResult != currNum) {
                        gridCopy[y][x] = currResult;
                        this.gridAge[y][x] = 0;
                        break;
                    }
                }
            }
        }
        this.previousGrid = JSON.parse(JSON.stringify(this.grid));
        this.grid = gridCopy;
    }

    // Return a list of changed locations, so frontend don't have to update every sprite.
    getChangeSet(config: Configuration): Map<string, string> {
        let changeSet = new Map();
        for (let y=0; y<this.size; y++) {
            for (let x=0; x<this.size; x++) {
                if (this.grid[y][x] != this.previousGrid[y][x]) {
                    let locStr = getLocString({x: x, y: y});
                    if (!config.colorMap.has(this.grid[y][x])) {
                        changeSet.set(locStr, "turd");
                    }
                    changeSet.set(locStr, config.colorMap.get(this.grid[y][x]));
                }
            }
        }
        return changeSet;
    }
}
