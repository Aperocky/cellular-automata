import { GridFunction } from './gridFunction';
import { countAdjacent } from './gridFunctions/countAdjacent';
import { spontaneousChange } from './gridFunctions/spontaneousChange';


export const FUNCTION_REGISTRY: Map<string, GridFunction> = new Map();
FUNCTION_REGISTRY.set("countadjacent", countAdjacent);
FUNCTION_REGISTRY.set("spontaneouschange", spontaneousChange);
