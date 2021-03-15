import { Square } from './square';
import * as CONSTANTS from './constants';
import { Location, getLocString } from '../grid/gridUtil';


// Overall control for visual stuff
export class Canvas {

    app: PIXI.Application;
    container: PIXI.Container;
    background: PIXI.Sprite;
    mapSquares: Map<string, Square>;

    constructor(size: number) {
        this.app = new PIXI.Application({
            width: CONSTANTS.DEFAULT_PIXEL_SIZE,
            height: CONSTANTS.DEFAULT_PIXEL_SIZE,
        });
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        this.addBackgroundSprite();
        this.populateMapSquares(size);
    }

    private addBackgroundSprite(): void {
        this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.background.x = 0;
        this.background.y = 0;
        this.background.height = CONSTANTS.DEFAULT_PIXEL_SIZE;
        this.background.width = CONSTANTS.DEFAULT_PIXEL_SIZE;
        this.background.tint = 0x101010;
        this.background.zIndex = -999;
        this.container.addChild(this.background);
    }

    private populateMapSquares(size: number): void {
        this.mapSquares = new Map();
        for (let y=0; y<size; y++) {
            for (let x=0; x<size; x++) {
                let location = {x: x, y: y};
                let square = new Square(location);
                this.mapSquares.set(getLocString(location), square);
                this.container.addChild(square);
            }
        }
    }

    updateMapSquares(changeSet: Map<string, string>): void {
        changeSet.forEach((value, key) => {
            this.mapSquares.get(key).setColor(value);
        });
    }
}
