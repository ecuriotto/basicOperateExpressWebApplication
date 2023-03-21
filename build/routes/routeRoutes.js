"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camundaInteract_1 = require("../camundaInteract");
//  Create route handler
const router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.render('index');
});
router.get('/connect', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ci = new camundaInteract_1.CamundaInteract();
        const token = yield ci.getToken();
        res.send(token);
    });
});
router.get('/processDefinitionIds', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ci = new camundaInteract_1.CamundaInteract();
        const processDefinitions = yield ci.getProcessDefinitionIds(req);
        //console.log(processDefinitions);
        res.send(processDefinitions);
    });
});
router.get('/processDefinitionXml/:key', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ci = new camundaInteract_1.CamundaInteract();
        const processDefinitionXml = yield ci.getProcessDefinitionXml(req);
        console.log(processDefinitionXml);
        res.send(processDefinitionXml);
    });
});
// Export router
module.exports = router;
