// This stores the configurations read in by natural language
import { ParameterizedFunction } from '../func/gridFunction';

export class Configuration {
    
    initialCondition?: number[];
    funcMap: Map<number, ParameterizedFunction[]>;

    setInitialCondition(initialCondition: number[]): void {
        this.initialCondition = initialCondition;
    }

    setFuncMap(funcMap: Map<number, ParameterizedFunction[]>): void {
        this.funcMap = funcMap;
    }
}
