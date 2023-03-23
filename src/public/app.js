// make sure you added bpmn-js to your your project
// dependencies via npm install --save bpmn-js
import BpmnViewer from 'bpmn-js';

export const setXml = (xml) => {
  emptyCanvas();

  var viewer = new BpmnViewer({
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

const emptyCanvas = () => {
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = '';
};
