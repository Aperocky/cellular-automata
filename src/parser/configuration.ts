// This stores the configurations read in by natural language
import { ParameterizedFunction } from '../func/gridFunction';
import { InitialCondition } from './initialCondition';

export class Configuration {

    initialCondition: InitialCondition;
    colorMap: Map<number, string>;
    funcMap: Map<number, ParameterizedFunction[]>;
    timeStep: number;

    setInitialCondition(initialCondition: InitialCondition): void {
        this.initialCondition = initialCondition;
    }

    setFuncMap(funcMap: Map<number, ParameterizedFunction[]>): void {
        this.funcMap = funcMap;
    }

    setColorMap(colorMap: Map<number, string>): void {
        this.colorMap = colorMap;
    }

    setTimeStep(timeStep: number): void {
        this.timeStep = timeStep;
    }
}
