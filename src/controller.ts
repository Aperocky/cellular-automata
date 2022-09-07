import { Configuration } from './parser/configuration';
import parse from './parser/parser';
import { setupTextbox } from './display/textbox';
import { Grid } from './grid/grid';
import { Canvas } from './display/canvas';


export class Controller {

    config: Configuration;
    canvas: Canvas;
    grid: Grid;
    size: number;
    runState: boolean;
    configString: string;

    constructor(size: number) {
        this.grid = new Grid(size);
        this.canvas = new Canvas(size);
        this.runState = false;
        setupTextbox(this);
    }

    setConfiguration(inputJson: string, hotStart: boolean = false): void {
        let config;
        try {
            config = parse(inputJson);
        } catch (e) {
            console.log(`error at parsing configuration ${e.message}`)
            throw e;
        }
        this.config = config;
        this.configString = inputJson;
        if (!hotStart) {
            this.grid.createInitialCondition(config);
            let changeSet = this.grid.getChangeSet(config);
            this.canvas.updateMapSquares(changeSet);
        }
    }

    setRunState(runState: boolean): void {
        this.runState = runState;
        if (this.runState) {
            this.run();
        }
    }

    runOnce(): void {
        this.grid.updateGrid(this.config);
        let changeSet = this.grid.getChangeSet(this.config);
        this.canvas.updateMapSquares(changeSet);
    }

    run(): void {
        let controller = this;
        controller.runOnce();
        setTimeout(() => {
            if (controller.runState) {
                controller.run();
            }
        }, controller.config.timeStep);
    }
}
