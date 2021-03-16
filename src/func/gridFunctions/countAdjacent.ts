import { GridFunction, ParameterizedFunction, COMPARISONS } from '../gridFunction';
import { Location, getAdjacentLocations, getDirectlyAdjacentLocations } from '../../grid/gridUtil';
import { Grid } from '../../grid/grid';


let getCountAdjacentGridFunction = (name, func): GridFunction => {
    return {
        parameterCount: 4,
        description: `${name} [comparison-operator] [target] [threshold] [destination]`,
        getParameterizedFunc: (...args: string[]) => {
            let comparisonType = args[0];
            let target = parseInt(args[1]);
            let threshold = parseInt(args[2]);
            let destination = parseInt(args[3]);
            if (!Number.isInteger(target) || !Number.isInteger(threshold) || !Number.isInteger(destination)) {
                throw new Error("Parameter target, threshold, destination of countAdjacent must be integer");
            }
            if (!(comparisonType in COMPARISONS)) {
                throw new Error(`Comparison-operator ${comparisonType} is not supported`);
            }
            return (grid: Grid, location: Location): number => {
                let adjacents = func(grid.size, location);
                let targetCounter = adjacents.filter(loc => grid.grid[loc.y][loc.x] == target).length;
                if (COMPARISONS[comparisonType](targetCounter, threshold)) {
                    return destination;
                }
                return grid.grid[location.y][location.x];
            }
        }
    }
}


export const countAdjacent = getCountAdjacentGridFunction("CountAdjacent", getAdjacentLocations);
export const countDirectlyAdjacent = getCountAdjacentGridFunction("CountDirectlyAdjacent", getDirectlyAdjacentLocations);


export const countAdjacentChance: GridFunction = {
    parameterCount: 5,
    description: "CountAdjacent [comparison-operator] [target] [threshold] [destination] [chance]",
    getParameterizedFunc: (...args: string[]) => {
        let chance = parseFloat(args.pop());
        if (chance < 0 || chance > 1) {
            throw new Error("Parameter chance of CountAdjacentChance must be between 0 and 1");
        }
        let baseFunc = countAdjacent.getParameterizedFunc(...args);
        return (grid: Grid, location: Location): number => {
            let result = baseFunc(grid, location);
            if (result != grid.grid[location.y][location.x]) {
                if (Math.random() < chance) {
                    return result;
                }
            }
            return grid.grid[location.y][location.x];
        }
    }
}
