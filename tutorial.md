# How to show bpmn diagram in a web application

It's possible to access bpmn diagrams directly in a webapplication through the browser. This is a feature that is leveraged for example by Operate in Camunda 8.
There are couple of tools that you should use:

## Tools

### bpmn-js

[bpmn-js](https://github.com/bpmn-io/bpmn-js) is a javascript library that allows you to display and interact with BPMN (Business Process Model and Notation) diagrams in a web browser.
With bpmn-js, you can easily integrate BPMN diagrams into your web applications and provide users with knowledge base app, a visual representation of the process being modeled. The library includes features for displaying diagrams, editing diagrams, and exporting diagrams to different formats.

### webpack

WebPack is a tool that helps organize and bundle JavaScript code so that it can be used in a web browser. When you use a library like bpmn-js, which is a complex JavaScript component, it may consist of many files and dependencies that need to be loaded properly in order to work correctly.

WebPack takes care of this process by analyzing all the files and dependencies needed for bpmn-js and creating a single, optimized file that can be easily loaded by the browser. This can save time and reduce errors when setting up the component for use on a webpage.

In summary, WebPack simplifies the process of bundling and loading JavaScript code, which can be especially helpful when dealing with complex components like bpmn-js.

### Backend

If you just want to show static bpmn files that you can access from your filesystem then you don't need any backend.
In case you need for example to retrieve your bpmn diagrams dynamically from Camunda 8, for instance using the Operate library, then you should use a backend (like Java - Springboot, Nodejs, etc). The backend will be responsible to interact with Operate and retrieve the BPMN diagram.

## Main steps

In order to put some context we refer to the simple nodejs express application available [here](https://github.com/ecuriotto/basicOperateExpressWebApplication)

1. Create a js file that renders the bpmn diagram: `/src/public/app.js`.
   This file exposes a function `showDiagram` that renders a bpmn xml file passed as an argument.
2. You will need other js files to interact with the backend and app.js. In the example they are called `/src/public/camundaFunctions.js`, `/src/public/utils.js`
3. The webpack.config.js file will take care of assembling the previous files together
4. The rest of the application depends on the type of backend that has been chosen

## Examples

These are examples of bpmn diagrams visualization apps that interact with Operate libraries:

1. [React - springboot](https://github.com/camunda-community-hub/camunda-custom-operation-tools)
   Frontend in React, backend Java and Spring Boot
2. The afore mentioned [express example](https://github.com/ecuriotto/basicOperateExpressWebApplication)

These are just for test purposes and not intended to be used in production.
