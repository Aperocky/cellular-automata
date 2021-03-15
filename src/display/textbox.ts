import * as CONSTANTS from './constants';
import { Controller } from '../controller';


const CONWAY_TEXT = `{
  "InitialCondition": "1 0.2",
  "0": [
    "CountAdjacent eq 1 3 1"
  ],
  "1": [
    "CountAdjacent lt 1 2 0",
    "CountAdjacent gt 1 3 0"
  ]
}`;


export default function setup(controller) {
    let textbox = <HTMLInputElement>document.getElementById(CONSTANTS.TEXTBOX_ELEMENT_ID);
    let startButton = document.getElementById(CONSTANTS.START_BUTTON_ELEMENT_ID);
    let continueButton = document.getElementById(CONSTANTS.CONTINUE_BUTTON_ELEMENT_ID);
    let stopButton = document.getElementById(CONSTANTS.STOP_BUTTON_ELEMENT_ID);

    console.log(textbox);
    textbox.value = CONWAY_TEXT;

    startButton.addEventListener("click", () => {
        let inputJson = textbox.value;
        try {
            controller.setConfiguration(inputJson);
        } catch (e) {
            alert(`JSON Parse error: ${e.message}`);
        }
    });

    continueButton.addEventListener("click", () => {
        controller.setRunState(true);
    });

    stopButton.addEventListener("click", () => {
        controller.setRunState(false);
    });
}
