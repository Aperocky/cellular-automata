import { Location } from '../grid/gridUtil';

export const COMPARISONS = {
    "eq": (a, b) => a == b,
    "le": (a, b) => a <= b,
    "lt": (a, b) => a < b,
    "gt": (a, b) => a > b,
    "ge": (a, b) => a >= b,
    "ne": (a, b) => a != b
}

export interface ParameterizedFunction {
    (grid: number[][], location: Location): number;
}

export interface GridFunction {
    description: string;
    parameterCount: number;
    getParameterizedFunc: (...args: string[]) => ParameterizedFunction;
}

