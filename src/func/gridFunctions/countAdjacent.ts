import { GridFunction, ParameterizedFunction, COMPARISONS } from '../gridFunction';
import { Location, getAdjacentLocations, getDirectlyAdjacentLocations } from '../../grid/gridUtil';
import { Grid } from '../../grid/grid';


let getCountAdjacentGridFunction = (name, func, isChanceFunc = false): GridFunction => {
    let parameterCount = isChanceFunc ? 5 : 4
    let chanceStr = isChanceFunc ? " [chance]" : "";
    return {
        parameterCount: parameterCount,
        description: `${name} [comparison-operator] [target] [threshold] [destination]${chanceStr}`,
        getParameterizedFunc: (...args: string[]) => {
            let comparisonType = args[0];
            let target = parseInt(args[1]);
            let threshold = parseInt(args[2]);
            let destination = parseInt(args[3]);
            let chance = 1;
            if (isChanceFunc) {
                chance = parseFloat(args[4]);
                if (chance < 0 || chance > 1) {
                    throw new Error(`Parameter chance of ${name} must be between 0 and 1`);
                }
            }
            if (!Number.isInteger(target) || !Number.isInteger(threshold) || !Number.isInteger(destination)) {
                throw new Error(`Parameter target, threshold, destination of ${name} must be integer`);
            }
            if (!(comparisonType in COMPARISONS)) {
                throw new Error(`Comparison-operator ${comparisonType} is not supported`);
            }
            return (grid: Grid, location: Location): number => {
                let adjacents = func(grid.size, location);
                let targetCounter = adjacents.filter(loc => grid.grid[loc.y][loc.x] == target).length;
                if (COMPARISONS[comparisonType](targetCounter, threshold)) {
                    if (Math.random() < chance) {
                        return destination;
                    }
                }
                return grid.grid[location.y][location.x];
            }
        }
    }
}


export const countAdjacent = getCountAdjacentGridFunction("CountAdjacent", getAdjacentLocations);
export const countDirectlyAdjacent = getCountAdjacentGridFunction("CountDirectlyAdjacent", getDirectlyAdjacentLocations);
export const countAdjacentChance = getCountAdjacentGridFunction("CountAdjacentChance", getAdjacentLocations, true)
export const countDirectlyAdjacentChance = getCountAdjacentGridFunction("CountAdjacentChance", getDirectlyAdjacentLocations, true)
