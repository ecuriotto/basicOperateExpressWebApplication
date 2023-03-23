const axios = require('axios');
const https = require('https');
const url = require('url');

const config = require('./connection-properties.js');

class CamundaInteract {
  authUrl = config.authUrl;
  clientId = config.clientId;
  clientSecret = config.clientSecret;
  audience = config.audience;
  grantType = config.grantType;
  OPERATE_URL = config.operateUrl;

  async getToken() {
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: this.audience,
      grant_type: this.grantType,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const response = await axios.post(this.authUrl, data, config);
      const responseJson = { token: response.data.access_token };
      return responseJson;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get token');
    }
  }

  async getProcessDefinitionIds(req) {
    const payload = {
      filter: {},
    };
    const headers = req.headers;
    const { authorization } = headers;
    const axiosHeaders = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(`${this.OPERATE_URL}v1/process-definitions/search`, payload, {
      headers: axiosHeaders,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    const processDefinitions = response.data?.items || [];
    console.log(processDefinitions);
    return processDefinitions;
  }

  async getProcessInstances(req) {
    if (req.url) {
      const key = this.getKeyFromUrl(req.url);
      console.log(key);
      if (key) {
        const payload = {
          filter: {
            processDefinitionKey: key,
          },
        };
        const headers = req.headers;
        const { authorization } = headers;
        const axiosHeaders = {
          Authorization: authorization,
          'Content-Type': 'application/json',
        };
        const response = await axios.post(
          `${this.OPERATE_URL}v1/process-instances/search`,
          payload,
          {
            headers: axiosHeaders,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          }
        );

        const processInstances = response.data?.items || [];
        console.log(processInstances);
        return processInstances;
      } else {
        throw new Error('key is null');
      }
    } else {
      throw new Error('url not defined');
    }
  }

  async getProcessDefinitionXml(req) {
    const headers = req.headers;
    const { authorization } = headers;
    const axiosHeaders = {
      Authorization: authorization,
      'Content-Type': 'application/xml',
    };

    if (req.url) {
      const key = this.getKeyFromUrl(req.url);

      if (key) {
        const response = await axios.get(`${this.OPERATE_URL}v1/process-definitions/${key}/xml`, {
          headers: axiosHeaders,
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });

        const processDefinitions = response.data || [];
        return processDefinitions;
      } else {
        throw new Error('key is null');
      }
    } else {
      throw new Error('url not defined');
    }
  }

  getKeyFromUrl(urlString) {
    if (urlString) {
      const parsedUrl = url.parse(urlString, true);
      if (parsedUrl && parsedUrl.pathname) {
        const pathParts = parsedUrl.pathname.split('/');
        const key = pathParts[pathParts.length - 1];
        return key;
      }
    }
    return '';
  }
}

module.exports = CamundaInteract;
