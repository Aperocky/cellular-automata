import { Configuration } from './parser/configuration';
import parse from './parser/parser';
import setup from './display/textbox';
import { Grid } from './grid/grid';
import { Canvas } from './display/canvas';


export class Controller {

    config: Configuration;
    canvas: Canvas;
    grid: Grid;
    size: number;
    runState: boolean;

    constructor(size: number) {
        this.grid = new Grid(size);
        this.canvas = new Canvas(size);
        this.runState = false;
        setup(this);
    }

    setConfiguration(inputJson: string): void {
        let config;
        try {
            config = parse(inputJson);
        } catch (e) {
            console.log(`error at parsing configuration ${e.message}`)
            throw e;
        }
        this.config = config;
        this.grid.createInitialCondition(config);
        let changeSet = this.grid.getChangeSet(config);
        this.canvas.updateMapSquares(changeSet);
        this.runState = true;
        this.run();
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
        setTimeout(() => {
            if (controller.runState) {
                controller.runOnce();
                controller.run();
            }
        }, controller.config.timeStep);
    }
}
