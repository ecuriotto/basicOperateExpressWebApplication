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
const app_js_1 = require("./app.js");
const camundaConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('connect', {
        method: 'GET',
    });
    const jsonResponse = yield response.json();
    console.log(jsonResponse);
    // Set the token in a cookie
    const token = jsonResponse.token;
    document.cookie = `token=${token}; path=/`;
});
const getProcessDefinitions = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = getCookie('token');
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    const response = yield fetch('processDefinitionIds', {
        method: 'GET',
        headers: headers,
        credentials: 'include', // <-- send cookies with the request
    });
    const jsonResponse = yield response.json();
    jsonToTable(jsonResponse);
});
function jsonToTable(jsonArray) {
    const data = jsonArray;
    const table = document.createElement('table');
    table.setAttribute('id', 'processDefinitionTable');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (const key in data[0]) {
        const headerCell = document.createElement('th');
        headerCell.innerText = key;
        headerRow.appendChild(headerCell);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    data.forEach((row) => {
        const dataRow = document.createElement('tr');
        for (const key in row) {
            const dataCell = document.createElement('td');
            dataCell.innerText = row[key];
            dataRow.appendChild(dataCell);
        }
        console.log(row);
        // Add click event listener to row
        dataRow.addEventListener('click', () => clickHandler(row.key));
        tbody.appendChild(dataRow);
    });
    table.appendChild(tbody);
    const div = document.getElementById('processDefinitionDiv');
    if (div) {
        div.innerHTML = '';
        div.appendChild(table);
    }
}
function clickHandler(key) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Row clicked:', key);
        const token = getCookie('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const xmlResponse = yield fetch(`processDefinitionXml/${key}`, {
            method: 'GET',
            headers: headers,
            credentials: 'include', // <-- send cookies with the request
        });
        //const xmlResponse2 = await response.xml();
        const xmlData = yield xmlResponse.text();
        console.log(xmlData);
        (0, app_js_1.setXml)(xmlData);
    });
}
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
document.addEventListener("DOMContentLoaded", function () {
    const buttonConnect = document.getElementById('connect');
    buttonConnect.addEventListener('click', camundaConnect);
    const buttonPD = document.getElementById('getProcessDefinitions');
    buttonPD.addEventListener('click', getProcessDefinitions);
});
