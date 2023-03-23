import { setXml } from './app.js';

const camundaConnect = async () => {
  const response = await fetch('connect', {
    method: 'GET',
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  // Set the token in a cookie
  const token = jsonResponse.token;
  document.cookie = `token=${token}; path=/`;
  let x = document.getElementById('snackbar');
  x.className = 'show';
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 4000);
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

  const htmlResponse = await response.text();
  document.querySelector('#processDefinitionDiv').innerHTML = htmlResponse;
  createTableEventListeners();
};

const getProcessInstances = async (key) => {
  const token = getCookie('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const response = await fetch(`processInstances/${key}`, {
    method: 'GET',
    headers: headers,
    credentials: 'include', // <-- send cookies with the request
  });
  const htmlResponse = await response.text();
  document.querySelector('#process-instances').innerHTML = htmlResponse;
};

async function showProcessDiagram(key) {
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

function createTableEventListeners() {
  const buttonsPI = document.querySelectorAll('.get-process-instances-button');
  buttonsPI.forEach(function (button) {
    button.addEventListener('click', function () {
      const processKey = this.getAttribute('data-process-definition-key');
      getProcessInstances(processKey);
    });
  });
  const buttonsPD = document.querySelectorAll('.get-diagram-button');
  buttonsPD.forEach(function (button) {
    button.addEventListener('click', function () {
      const processKey = this.getAttribute('data-diagram-key');
      console.log('click ' + processKey);
      showProcessDiagram(processKey);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const buttonConnect = document.getElementById('connect');
  buttonConnect.addEventListener('click', camundaConnect);

  const buttonPD = document.getElementById('getProcessDefinitions');
  buttonPD.addEventListener('click', getProcessDefinitions);
});
