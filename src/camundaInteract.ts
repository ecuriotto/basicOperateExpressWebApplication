import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import http from 'http';
import https from 'https';
import url from 'url';

export class CamundaInteract {
  authUrl = 'https://login.cloud.camunda.io/oauth/token';
  clientId = 'BurcdXKv.biGBIh2ZqW1g_c-OgtPA7.f';
  clientSecret = '3NcmN8YoNEauLKyzFoqOjfJQ-hMt8WHfnAkN7Vabf5i27jePPy2S0BNIUA~qAMAs';
  audience = 'operate.camunda.io';
  grantType = 'client_credentials';
  OPERATE_URL: string = 'https://bru-2.operate.camunda.io/6f5078aa-c1ec-4698-b86a-f84e8536da63/';

  async getToken(): Promise<object> {
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
      const response: AxiosResponse = await axios.post(this.authUrl, data, config);
      const responseJson = { token: response.data.access_token };
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get token');
    }
  }

  async getProcessDefinitionIds(req: http.IncomingMessage): Promise<object> {
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
    return processDefinitions;
  }

  async getProcessDefinitionXml(req: http.IncomingMessage): Promise<object | undefined> {
    const headers = req.headers;
    const { authorization } = headers;
    const axiosHeaders = {
      Authorization: authorization,
      'Content-Type': 'application/xml',
    };
    if (req.url) {
      const parsedUrl = url.parse(req.url as any, true);
      if (parsedUrl && parsedUrl.pathname) {
        const pathParts = parsedUrl.pathname.split('/');
        const key = pathParts[pathParts.length - 1];
        //const key = parsedUrl.query.key;
        console.log('my url: ' + parsedUrl.href);
        console.log('my url' + req.headers.host);
        if (key) {
          const response = await axios.get(`${this.OPERATE_URL}v1/process-definitions/${key}/xml`, {
            headers: axiosHeaders,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          });
          console.log(response.data);
          const processDefinitions = response.data || [];
          return processDefinitions;
        } else {
          throw new Error('key is null');
        }
      } else {
        throw new Error('url not defined');
      }
    }
  }
}
