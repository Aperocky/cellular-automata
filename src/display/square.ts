import * as CONSTANTS from './constants';
import { Location } from '../grid/gridUtil';


export class Square extends PIXI.Sprite {

    location: Location;

    constructor(location: Location) {
        super(PIXI.Texture.WHITE);
        this.location = location;
        this.height = CONSTANTS.DEFAULT_SQUARE_SIZE;
        this.width = CONSTANTS.DEFAULT_SQUARE_SIZE;
        this.x = CONSTANTS.DEFAULT_SQUARE_AND_BORDER_SIZE * location.x;
        this.y = CONSTANTS.DEFAULT_SQUARE_AND_BORDER_SIZE * location.y;
        this.setColor("tintblack");
    }

    setColor(color: string): void {
        if (!CONSTANTS.COLOR_MAP.has(color)) {
            // colors not found in colorMap provided
            color = "black";
        }
        this.tint = CONSTANTS.COLOR_MAP.get(color);
    }
}
