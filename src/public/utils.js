import { printSomething, setXml } from './app.js';

const camundaConnect = async () => {
  const response = await fetch('connect', {
    method: 'GET',
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  // Set the token in a cookie
  const token = jsonResponse.token;
  document.cookie = `token=${token}; path=/`;

};

const getProcessDefinitions = async () => {
  const token = getCookie('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const response = await fetch('processDefinitionIds', {
    method: 'GET',
    headers: headers,
    credentials: 'include', // <-- send cookies with the request
  });
  const jsonResponse = await response.json();
  jsonToTable(jsonResponse);
};

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

async function clickHandler(key) {
  console.log('Row clicked:', key);
  const token = getCookie('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const xmlResponse = await fetch(`processDefinitionXml/${key}`, {
    method: 'GET',
    headers: headers,
    credentials: 'include', // <-- send cookies with the request
  });
  //const xmlResponse2 = await response.xml();
  const xmlData = await xmlResponse.text();
  console.log(xmlData);
  setXml(xmlData);
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

document.addEventListener("DOMContentLoaded", function() {

      const buttonConnect = document.getElementById('connect');
      buttonConnect.addEventListener('click', camundaConnect);

      const buttonPD = document.getElementById('getProcessDefinitions');
      buttonPD.addEventListener('click', getProcessDefinitions);

});
