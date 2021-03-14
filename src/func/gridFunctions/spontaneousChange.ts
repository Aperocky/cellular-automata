import { GridFunction, ParameterizedFunction, COMPARISONS } from '../gridFunction';
import { Location } from '../../grid/gridUtil';


export const spontaneousChange: GridFunction = {
    parameterCount: 2,
    description: "SpontaneousChange [destination] [chance]",
    getParameterizedFunc: (...args: string[]) => {
        let destination = parseInt(args[0]);
        let chance = parseFloat(args[1]);
        if (!Number.isInteger(destination)) {
            throw new Error("Parameter destination of SpontaneousChange must be integer");
        }
        if (chance < 0 || chance > 1) {
            throw new Error("Parameter chance of SpontaneousChange must be between 0 and 1");
        }
        return (grid: number[][], location: Location): number => {
            if (Math.random() < chance) {
                return destination;
            }
            return grid[location.y][location.x];
        }
    }
}
