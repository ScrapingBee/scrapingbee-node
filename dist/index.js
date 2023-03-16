"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingBeeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const utils_1 = require("./utils");
const API_URL = 'https://app.scrapingbee.com/api/v1/';
class ScrapingBeeClient {
    constructor(api_key) {
        this.api_key = api_key;
    }
    request(method, config) {
        let params = config.params || {};
        // Headers
        let raw_headers = config.headers || {};
        let headers = utils_1.process_headers(raw_headers);
        if (Object.keys(raw_headers).length > 0) {
            params['forward_headers'] = true;
        }
        // Cookies
        let cookies = config.cookies || null;
        if (cookies != null) {
            params['cookies'] = cookies;
        }
        // Other query params
        params['api_key'] = this.api_key;
        params['url'] = config.url;
        params = utils_1.process_params(params);
        // Request body
        let data = config.data || {};
        let axios_params = {
            method: method,
            headers: headers,
            params: params,
            data: data,
            responseType: 'arraybuffer',
        };
        // Retry policy
        if (config.retries !== undefined) {
            axios_retry_1.default(axios_1.default, { retries: config.retries });
        }
        return axios_1.default(API_URL, axios_params);
    }
    get(config) {
        return this.request('GET', config);
    }
    post(config) {
        return this.request('POST', config);
    }
}
exports.ScrapingBeeClient = ScrapingBeeClient;
