import * as CONSTANTS from './constants';
import { Controller } from '../controller';


const FOREST_FIRE = `{
  "0": [
    "SpontaneousChange 1 0.02",
    "CountAdjacentChance gt 1 0 1 0.1"
  ],
  "1": [
    "SpontaneousChange 2 0.002",
    "CountAdjacent gt 2 0 2"
  ],
  "2": [
    "SpontaneousChange 0 1"
  ],
  "colorMap": {
    "0": "black",
    "1": "green",
    "2": "red"
  },
  "timeStep": 100
}`;


function updateConfiguration(inputJson: string, controller: Controller, runState: boolean): void {
    if (inputJson != controller.configString) {
        try {
            controller.setConfiguration(inputJson, true);
        } catch (e) {
            alert(`JSON Parse error: ${e.message}`);
            return;
        }
    }
    controller.setRunState(runState);
}


function loadJson(name: string, textbox: HTMLInputElement): void {
    let path = `/sample/${CONSTANTS.SAMPLE_SELECT_MAP.get(name)}`;
    if (!(location.hostname == "0.0.0.0")) {
        path = `/cellular-automata${path}`;
    }
    let request = new XMLHttpRequest();
    request.onload = function () {
        let result = this.response;
        textbox.value = result;
    }
    request.open("GET", path);
    request.send();
}


function setupSelectSample(textbox: HTMLInputElement): void {
    let selectSample = <HTMLSelectElement>document.getElementById(CONSTANTS.SELECT_SAMPLE_ELEMENT_ID);
    for (const name of CONSTANTS.SAMPLE_SELECT_MAP.keys()) {
        let option = document.createElement("option");
        option.setAttribute("value", name);
        option.textContent = name;
        selectSample.appendChild(option);
    }
    selectSample.onchange = function () {
        let name = selectSample.value;
        loadJson(name, textbox);
    }
    selectSample.value = CONSTANTS.INITIAL_SELECT_NAME;
    loadJson(selectSample.value, textbox);
}


export function setupTextbox(controller: Controller) {
    let textbox = <HTMLInputElement>document.getElementById(CONSTANTS.TEXTBOX_ELEMENT_ID);
    let startButton = document.getElementById(CONSTANTS.START_BUTTON_ELEMENT_ID);
    let continueButton = document.getElementById(CONSTANTS.CONTINUE_BUTTON_ELEMENT_ID);
    let stopButton = document.getElementById(CONSTANTS.STOP_BUTTON_ELEMENT_ID);
    let stepButton = document.getElementById(CONSTANTS.STEP_BUTTON_ELEMENT_ID);

    setupSelectSample(textbox);

    startButton.addEventListener("click", () => {
        let inputJson = textbox.value;
        try {
            controller.setConfiguration(inputJson);
            if (!controller.runState) {
                controller.setRunState(true);
            }
        } catch (e) {
            alert(`JSON Parse error: ${e.message}`);
        }
    });

    continueButton.addEventListener("click", () => {
        if (controller.runState) {
            return;
        }
        updateConfiguration(textbox.value, controller, true);
    });

    stopButton.addEventListener("click", () => {
        controller.setRunState(false);
    });

    stepButton.addEventListener("click", () => {
        controller.setRunState(false);
        updateConfiguration(textbox.value, controller, false);
        controller.runOnce();
    });
}
