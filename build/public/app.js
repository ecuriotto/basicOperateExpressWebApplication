"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setXml = void 0;
// we use stringify to inline an example XML document
const pizza_collaboration_bpmn_1 = __importDefault(require("../resources/pizza-collaboration.bpmn"));
// make sure you added bpmn-js to your your project
// dependencies via npm install --save bpmn-js
const bpmn_js_1 = __importDefault(require("bpmn-js"));
const setXml = (xml) => {
    emptyCanvas();
    var viewer = new bpmn_js_1.default({
        container: '#canvas',
    });
    viewer
        .importXML(xml)
        .then(function (result) {
        const { warnings } = result;
        console.log('success !', warnings);
        viewer.get('canvas').zoom('fit-viewport');
    })
        .catch(function (err) {
        const { warnings, message } = err;
        console.log('something went wrong:', warnings, message);
    });
};
exports.setXml = setXml;
const emptyCanvas = () => {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = "";
};
