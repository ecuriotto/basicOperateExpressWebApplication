const { Router } = require('express');
const CamundaInteract = require('../camundaInteract');

//  Create route handler
const router = Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/connect', async function (req, res) {
  const ci = new CamundaInteract();
  const token = await ci.getToken();
  res.send(token);
});

router.get('/processDefinitionIds', async function (req, res) {
  const ci = new CamundaInteract();
  const processDefinitions = await ci.getProcessDefinitionIds(req);
  console.log(processDefinitions);
  res.render('partials/process-definitions', { processDefinitions: processDefinitions });
  //res.send(processDefinitions);
});

router.get('/processInstances/:key', async function (req, res) {
  const ci = new CamundaInteract();
  const processInstances = await ci.getProcessInstances(req);
  res.render('partials/process-instances', { processInstances: processInstances });
});

router.get('/processDefinitionXml/:key', async function (req, res) {
  const ci = new CamundaInteract();
  const processDefinitionXml = await ci.getProcessDefinitionXml(req);
  res.send(processDefinitionXml);
});

// Export router
module.exports = router;
