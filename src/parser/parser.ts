import { GridFunction, ParameterizedFunction } from '../func/gridFunction';
import { FUNCTION_REGISTRY } from '../func/funcRegistry';
import { Configuration } from './configuration';
import { InitialCondition } from './initialCondition';
import * as CONSTANTS from '../display/constants';


export default function parse(inputJson: string): Configuration {
    inputJson = inputJson.toLowerCase();
    let rawConfig = JSON.parse(inputJson);
    let config = new Configuration();
    if ("initialcondition" in rawConfig) {
        let initialConditionString = rawConfig["initialcondition"];
        if (typeof initialConditionString != "string") {
            throw new Error("initial condition must be string");
        }
        config.setInitialCondition(InitialCondition.parse(initialConditionString));
        delete rawConfig.initialcondition;
    } else {
        config.setInitialCondition(new InitialCondition("NONE", 0));
    }
    if ("colormap" in rawConfig) {
        let colorMap = rawConfig["colormap"];
        config.setColorMap(parseColorMap(colorMap));
        delete rawConfig.colormap;
    } else {
        config.setColorMap(CONSTANTS.DEFAULT_COLOR_MAP);
    }
    if ("timestep" in rawConfig) {
        let timeStep = rawConfig["timestep"]
        config.setTimeStep(parseTimeStep(timeStep));
        delete rawConfig.timestep;
    } else {
        config.setTimeStep(100);
    }
    let funcMap = parseFuncMap(rawConfig);
    config.setFuncMap(funcMap);
    return config
}

function parseTimeStep(timeStep): number {
    let time = parseInt(timeStep);
    if (!Number.isInteger(time)) {
        throw new Error(`Timestep must be an integer value`);
    }
    if (time < 0) {
        throw new Error(`Timestep cannot be lower than 0`);
    }
    return time;
}

function parseColorMap(colorMap): Map<number, string> {
    let result: Map<number, string> = new Map();
    if (typeof colorMap != "object") {
        throw new Error("Color map must be object");
    }
    for (const [numStr, color] of Object.entries(colorMap)) {
        if (typeof color != "string") {
            throw new Error(`Color type must be string, not ${typeof color}`);
        }
        let num = parseInt(numStr);
        if (!Number.isInteger(num)) {
            throw new Error(`Color Map keys must be integers, not ${numStr}`);
        }
        if (!CONSTANTS.COLOR_MAP.has(color)) {
            throw new Error(`Color ${color} is not found`);
        }
        result.set(num, color);
    }
    return result;
}

// Only accept 1 distinct type for now.
function parseInitialCondition(cond: string): number[] {
    let conds = cond.split(/\s+/);
    if (conds.length != 2) {
        throw new Error("Initial condition must be 2 numbers");
    }
    let target = parseInt(conds[0])
    let chance = parseFloat(conds[1])
    if (!Number.isInteger(target)) {
        throw new Error("Parameter target of initial condition must be integer");
    }
    if (chance < 0 || chance > 1) {
        throw new Error("Parameter chance of initial condition must be between 0 and 1");
    }
    return [target, chance];
}

function parseFuncMap(inputs): Map<number, ParameterizedFunction[]> {
    let result = new Map();
    for (const [targetStr, paramList] of Object.entries(inputs)) {
        let target = parseInt(targetStr);
        if (!Number.isInteger(target)) {
            throw new Error(`Key ${targetStr} must be integer`);
        }
        if (!Array.isArray(paramList)) {
            throw new Error(`Parameter values of key ${targetStr} must be lists`);
        }
        let funcResults: ParameterizedFunction[] = [];
        paramList.forEach((param) => {
            funcResults.push(parseFunc(param));
        });
        result.set(target, funcResults);
    }
    return result;
}

function parseFunc(inputString: string): ParameterizedFunction {
    if (typeof inputString != "string") {
        throw new Error(`Input ${inputString} need to be string`);
    }
    let inputs = inputString.split(/\s+/);
    let funcName = inputs.shift();
    if (!FUNCTION_REGISTRY.has(funcName)) {
        throw new Error(`Function name ${funcName} is unrecognized`);
    }
    let funcFactory: GridFunction = FUNCTION_REGISTRY.get(funcName);
    if (inputs.length != funcFactory.parameterCount) {
        throw new Error(`Function ${funcName} takes in ${funcFactory.parameterCount} parameters, but only ${inputs.length} is given`);
    }
    return funcFactory.getParameterizedFunc(...inputs);
}
