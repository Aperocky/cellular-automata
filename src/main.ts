/// <reference types="pixi.js" />
import { Controller } from './controller';


let controller = new Controller(100);

let canvasDiv = document.getElementById('canvas');
canvasDiv.appendChild(controller.canvas.app.view);
