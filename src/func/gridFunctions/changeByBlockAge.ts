import { GridFunction, ParameterizedFunction, COMPARISONS } from '../gridFunction';
import { Grid } from '../../grid/grid';
import { Location } from '../../grid/gridUtil';


export const changeByBlockAge: GridFunction = {
    parameterCount: 4,
    description: "ChangeByBLockAge [comparison-operator] [threshold] [destination] [chance]",
    getParameterizedFunc: (...args: string[]) => {
        let comparisonType = args[0];
        let threshold = parseInt(args[1]);
        let destination = parseInt(args[2]);
        let chance = parseFloat(args[3]);
        if (!Number.isInteger(threshold) || !Number.isInteger(destination)) {
            throw new Error("Parameter threshold and destination of ChangeByBlockAge must be integer");
        }
        if (!(comparisonType in COMPARISONS)) {
            throw new Error(`Comparison-operator ${comparisonType} is not supported`);
        }
        if (chance < 0 || chance > 1) {
            throw new Error("Parameter chance of ChangeByBlockAge must be between 0 and 1");
        }
        return (grid: Grid, location: Location): number => {
            let currAge = grid.gridAge[location.y][location.x];
            if (COMPARISONS[comparisonType](currAge, threshold)) {
                if (Math.random() < chance) {
                    return destination;
                }
            }
            return grid.grid[location.y][location.x];
        }
    }
}
