
const CENTRAL_DOT_START = "centraldot";
const CORNER_DOT_START = "cornerdot";
const CENTRAL_SQUARE_START = "centralsquare";

const CONDITION_TYPES: Map<string, string> = new Map();
CONDITION_TYPES.set(CENTRAL_DOT_START, "CENTRAL_DOT");
CONDITION_TYPES.set(CORNER_DOT_START, "CORNER_DOT");
CONDITION_TYPES.set(CENTRAL_SQUARE_START, "CENTRAL_SQUARE");


export class InitialCondition {

    conditionType: string;
    target: number;
    chance: number;

    constructor(conditionType: string, target: number, chance: number = 0) {
        this.conditionType = conditionType;
        this.target = target;
        this.chance = chance;
    }

    createInitialCondition(grid: number[][], size: number): void {
        let halfIndex;
        if (size % 2 == 0) {
            halfIndex = Math.floor(size/2) - 1;
        } else {
            halfIndex = Math.floor(size/2);
        }
        switch (this.conditionType) {
            case "DEFAULT": {
                for (let y=0; y<size; y++) {
                    for (let x=0; x<size; x++) {
                        if (Math.random() < this.chance) {
                            grid[y][x] = this.target;
                        }
                    }
                }
                break;
            }
            case "CENTRAL_DOT": {
                grid[halfIndex][halfIndex] = this.target;
                break;
            }
            case "CENTRAL_SQUARE": {
                grid[halfIndex][halfIndex] = this.target;
                grid[halfIndex+1][halfIndex] = this.target;
                grid[halfIndex][halfIndex+1] = this.target;
                grid[halfIndex+1][halfIndex+1] = this.target;
                break;
            }
            case "CORNER_DOT": {
                grid[0][0] = this.target;
                break;
            }
        }
    }

    static parse(input: string): InitialCondition {
        let conds = input.split(/\s+/);
        let conditionType = "DEFAULT";
        let target: number;
        let chance = 1;
        if (conds.length != 2) {
            throw new Error("Initial condition parse error, see readme for instruction");
        }
        if (CONDITION_TYPES.has(conds[0].toLowerCase())) {
            conditionType = CONDITION_TYPES.get(conds[0].toLowerCase());
            target = parseInt(conds[1]);
        } else {
            target = parseInt(conds[0]);
            chance = parseFloat(conds[1]);
        }
        if (!Number.isInteger(target)) {
            throw new Error("Parameter target of initial condition must be integer");
        }
        if (chance < 0 || chance > 1) {
            throw new Error("Parameter chance of initial condition must be between 0 and 1");
        }
        return new InitialCondition(conditionType, target, chance);
    }
}
