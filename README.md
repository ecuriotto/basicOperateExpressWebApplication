# Basic custom Operate webapp in nodejs express

## Preliminary

You need to provide the authentication file to connect to Operate.

Go to your SAAS camunda cluster and create a client as explained [here](https://docs.camunda.io/docs/components/console/manage-clusters/manage-api-clients/).
Copy the client information in a new file called src/connection-properties.js with the
following content

```json
module.exports = {
authUrl: 'https://login.cloud.camunda.io/oauth/token',
clientId: 'yourclientid',
clientSecret: 'yourclientsecret',
audience: 'operate.camunda.io',
grantType: 'client_credentials',
operateUrl: 'your operate url',
};
```

## Start

In the project directory, you can run:

### `npm start`

Build the front end and runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

### `npm test`

Runs tests in vitest
