import { vi, it, expect, describe, beforeAll, test } from 'vitest';
const CamundaInteract = require('./CamundaInteract');
const axios = require('axios');
const https = require('https');

// Mock the axios module
//vi.mock('axios');
axios.post = vi.fn();
axios.get = vi.fn();

describe('CamundaInteract', () => {
  let camunda;
  beforeAll(() => {
    camunda = new CamundaInteract();
  });

  describe('getToken', () => {
    it('should make a request to the auth server', async () => {
      const mockResponse = { access_token: 'mockToken' };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await camunda.getToken();

      expect(result.token).toEqual('mockToken');
      expect(axios.post).toHaveBeenCalledWith(
        camunda.authUrl,
        {
          client_id: camunda.clientId,
          client_secret: camunda.clientSecret,
          audience: camunda.audience,
          grant_type: camunda.grantType,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    });
  });
  describe('getProcessDefinitionIds', () => {
    it('should return process definitions', async () => {
      const req = { headers: { authorization: 'Bearer token' } };
      const response = {
        data: {
          items: [
            {
              key: 2251799813789791,
              name: 'todayCheck',
              version: 1,
              bpmnProcessId: 'todayCheck',
            },
            {
              key: 2251799813790146,
              name: 'todayCheck',
              version: 2,
              bpmnProcessId: 'todayCheck',
            },
          ],
        },
      };
      axios.post.mockResolvedValue(response);

      const processDefinitions = await camunda.getProcessDefinitionIds(req);

      expect(axios.post).toHaveBeenCalledWith(
        `${camunda.OPERATE_URL}v1/process-definitions/search`,
        { filter: {} },
        {
          headers: {
            Authorization: req.headers.authorization,
            'Content-Type': 'application/json',
          },
          httpsAgent: expect.any(https.Agent),
        }
      );
      expect(processDefinitions).toEqual(response.data.items);
    });

    it('should throw an error if request fails', async () => {
      const req = { headers: { authorization: 'Bearer token' } };
      axios.post.mockRejectedValue(new Error('Failed to get process definition IDs'));

      await expect(camunda.getProcessDefinitionIds(req)).rejects.toThrow(
        'Failed to get process definition IDs'
      );
    });
  });
  describe('getProcessInstances', () => {
    it('should return process instances', async () => {
      const req = { headers: { authorization: 'Bearer token' } };
      const response = {
        data: {
          items: [
            {
              key: 4503599627476396,
              processVersion: 2,
              bpmnProcessId: 'testDMNInput',
              startDate: '2022-12-21T10:54:11.247+0000',
              state: 'ACTIVE',
              processDefinitionKey: 2251799813790786,
            },
            {
              key: 4503599627476437,
              processVersion: 2,
              bpmnProcessId: 'testDMNInput',
              startDate: '2022-12-21T10:54:52.034+0000',
              state: 'ACTIVE',
              processDefinitionKey: 2251799813790786,
            },
          ],
        },
      };
      axios.post.mockResolvedValue(response);

      const processDefinitions = await camunda.getProcessDefinitionIds(req);

      expect(axios.post).toHaveBeenCalledWith(
        `${camunda.OPERATE_URL}v1/process-definitions/search`,
        { filter: {} },
        {
          headers: {
            Authorization: req.headers.authorization,
            'Content-Type': 'application/json',
          },
          httpsAgent: expect.any(https.Agent),
        }
      );
      expect(processDefinitions).toEqual(response.data.items);
    });

    it('should throw an error if request fails', async () => {
      const req = { headers: { authorization: 'Bearer token' } };
      axios.post.mockRejectedValue(new Error('Failed to get process definition IDs'));

      await expect(camunda.getProcessDefinitionIds(req)).rejects.toThrow(
        'Failed to get process definition IDs'
      );
    });
  });
  describe('getProcessDefinitionXml', () => {
    it('should call axios.get with the correct arguments', async () => {
      const req = {
        headers: { authorization: 'Bearer abc123' },
        url: 'operateUrl/6f5078aa-c1ec-4698-b86a-f84e8536da63',
        httpsAgent: { _events: {} },
      };
      const mockResponse = {
        data: '<div>xml data</div>',
      };
      axios.get.mockResolvedValue(mockResponse);

      await camunda.getProcessDefinitionXml(req);

      expect(axios.get).toHaveBeenCalledWith(
        `${camunda.OPERATE_URL}v1/process-definitions/6f5078aa-c1ec-4698-b86a-f84e8536da63/xml`,
        {
          headers: {
            Authorization: 'Bearer abc123',
            'Content-Type': 'application/xml',
          },
          httpsAgent: expect.any(https.Agent),
        }
      );
    });

    it('should return the XML data from the API response', async () => {
      const req = { headers: { authorization: 'Bearer token' }, url: 'operateUrl' };
      const mockResponse = {
        data: 'xml data',
      };
      axios.get.mockResolvedValue(mockResponse);

      const result = await camunda.getProcessDefinitionXml(req);

      expect(result).toBe('xml data');
    });

    it('should throw an error if key is null', async () => {
      const reqWithoutUrl = {
        headers: {
          authorization: 'Bearer abc123',
        },
      };

      await expect(camunda.getProcessDefinitionXml(reqWithoutUrl)).rejects.toThrow(
        'url not defined'
      );
    });

    it('should throw an error if url is not defined', async () => {
      const reqWithoutUrl = {
        headers: {
          authorization: 'Bearer abc123',
        },
      };

      await expect(camunda.getProcessDefinitionXml(reqWithoutUrl)).rejects.toThrow(
        'url not defined'
      );
    });
  });
});
