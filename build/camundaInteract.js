"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamundaInteract = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const url_1 = __importDefault(require("url"));
class CamundaInteract {
    constructor() {
        this.authUrl = 'https://login.cloud.camunda.io/oauth/token';
        this.clientId = 'BurcdXKv.biGBIh2ZqW1g_c-OgtPA7.f';
        this.clientSecret = '3NcmN8YoNEauLKyzFoqOjfJQ-hMt8WHfnAkN7Vabf5i27jePPy2S0BNIUA~qAMAs';
        this.audience = 'operate.camunda.io';
        this.grantType = 'client_credentials';
        this.OPERATE_URL = 'https://bru-2.operate.camunda.io/6f5078aa-c1ec-4698-b86a-f84e8536da63/';
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield axios_1.default.post(this.authUrl, data, config);
                const responseJson = { token: response.data.access_token };
                console.log(responseJson);
                return responseJson;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to get token');
            }
        });
    }
    getProcessDefinitionIds(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                filter: {},
            };
            const headers = req.headers;
            const { authorization } = headers;
            const axiosHeaders = {
                Authorization: authorization,
                'Content-Type': 'application/json',
            };
            const response = yield axios_1.default.post(`${this.OPERATE_URL}v1/process-definitions/search`, payload, {
                headers: axiosHeaders,
                httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }),
            });
            const processDefinitions = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.items) || [];
            return processDefinitions;
        });
    }
    getProcessDefinitionXml(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = req.headers;
            const { authorization } = headers;
            const axiosHeaders = {
                Authorization: authorization,
                'Content-Type': 'application/xml',
            };
            if (req.url) {
                const parsedUrl = url_1.default.parse(req.url, true);
                if (parsedUrl && parsedUrl.pathname) {
                    const pathParts = parsedUrl.pathname.split('/');
                    const key = pathParts[pathParts.length - 1];
                    //const key = parsedUrl.query.key;
                    console.log('my url: ' + parsedUrl.href);
                    console.log('my url' + req.headers.host);
                    if (key) {
                        const response = yield axios_1.default.get(`${this.OPERATE_URL}v1/process-definitions/${key}/xml`, {
                            headers: axiosHeaders,
                            httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }),
                        });
                        console.log(response.data);
                        const processDefinitions = response.data || [];
                        return processDefinitions;
                    }
                    else {
                        throw new Error('key is null');
                    }
                }
                else {
                    throw new Error('url not defined');
                }
            }
        });
    }
}
exports.CamundaInteract = CamundaInteract;
