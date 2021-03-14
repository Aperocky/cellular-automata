// Backend representation of cellular automata.
import { Configuration } from '../parser/configuration';
import { ParameterizedFunction } from '../func/gridFunction';


export class Grid {

    size: number;
    grid: number[][];

    constructor(size: number) {
        this.size = size;
        this.grid = Array.apply(null, new Array(size)).map(e => Array(10).fill(0));
    }


    createInitialCondition(config: Configuration): void {
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
                let currNum = this.grid[y][x];
                if (!config.funcMap.has(currNum)) {
                    continue;
                }
                let paramFuncs: ParameterizedFunction[] = config.funcMap.get(currNum) 
                for (let i=0; i<paramFuncs.length; i++) {
                    let currResult = paramFuncs[i](this.grid, {x: x, y: y});
                    if (currResult != currNum) {
                        gridCopy[y][x] = currResult;
                        break;
                    }
                }
            }
        }
        this.grid = gridCopy;
    }
}
