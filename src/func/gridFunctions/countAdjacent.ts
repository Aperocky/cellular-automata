import { GridFunction, ParameterizedFunction, COMPARISONS } from '../gridFunction';
import { Location, getAdjacentLocations } from '../../grid/gridUtil';


export const countAdjacent: GridFunction = {
    parameterCount: 4,
    description: "CountAdjacent [comparison-operator] [target] [threshold] [destination]",
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
        return (grid: number[][], location: Location): number => {
            let adjacents = getAdjacentLocations(grid.length, location);
            let targetCounter = adjacents.filter(loc => grid[loc.y][loc.x] == target).length;
            if (COMPARISONS[comparisonType](targetCounter, threshold)) {
                return destination;
            }
            return grid[location.y][location.x];
        }
    }
}
