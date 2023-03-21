import { Request, Response, Router } from 'express';
import { CamundaInteract } from '../camundaInteract';

//  Create route handler
const router: Router = Router();

router.get('/', function (req: Request, res: Response) {
  res.render('index');
});

router.get('/connect', async function (req: Request, res: Response) {
  const ci = new CamundaInteract();
  const token = await ci.getToken();
  res.send(token);
});

router.get('/processDefinitionIds', async function (req: Request, res: Response) {
  const ci = new CamundaInteract();
  const processDefinitions = await ci.getProcessDefinitionIds(req);
  //console.log(processDefinitions);
  res.send(processDefinitions);
});

router.get('/processDefinitionXml/:key', async function (req: Request, res: Response) {
  const ci = new CamundaInteract();
  const processDefinitionXml = await ci.getProcessDefinitionXml(req);
  console.log(processDefinitionXml);
  res.send(processDefinitionXml);
});
// Export router
module.exports = router;
