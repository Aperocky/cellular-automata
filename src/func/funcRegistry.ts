import { GridFunction } from './gridFunction';
import { countAdjacent, countAdjacentChance } from './gridFunctions/countAdjacent';
import { spontaneousChange } from './gridFunctions/spontaneousChange';
import { changeByBlockAge } from './gridFunctions/changeByBlockAge';


export const FUNCTION_REGISTRY: Map<string, GridFunction> = new Map();
FUNCTION_REGISTRY.set("countadjacent", countAdjacent);
FUNCTION_REGISTRY.set("spontaneouschange", spontaneousChange);
FUNCTION_REGISTRY.set("countadjacentchance", countAdjacentChance);
FUNCTION_REGISTRY.set("changebyblockage", changeByBlockAge);
