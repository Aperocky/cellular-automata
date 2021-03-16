import { Location } from '../grid/gridUtil';
import { Grid } from '../grid/grid';


export const COMPARISONS = {
    "eq": (a, b) => a == b,
    "le": (a, b) => a <= b,
    "lt": (a, b) => a < b,
    "gt": (a, b) => a > b,
    "ge": (a, b) => a >= b,
    "ne": (a, b) => a != b
}

export interface ParameterizedFunction {
    (grid: Grid, location: Location): number;
}

export interface GridFunction {
    description: string;
    parameterCount: number;
    getParameterizedFunc: (...args: string[]) => ParameterizedFunction;
}
