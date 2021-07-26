"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingBeeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
const API_URL = 'https://app.scrapingbee.com/api/v1/';
class ScrapingBeeClient {
    constructor(api_key) {
        this.api_key = api_key;
    }
    request(method, url, config = {}) {
        headers = config.headers || {};
        headers = utils_1.process_headers(headers);
        cookies = config.cookies || null;
        if (cookies != null) {
            params['cookies'] = cookies;
        }
        params['api_key'] = this.api_key;
        params['url'] = url;
        params = utils_1.process_params(params);
        var axios_params = {
            method: method,
            headers: headers,
            params: params,
            data: data,
            responseType: 'arraybuffer',
        };
        return axios_1.default(API_URL, axios_params);
    }
    get(url, params, headers, cookies) {
        return this.request('GET', url, params, headers, cookies);
    }
    post(url, params, headers, cookies, data) {
        return this.request('POST', url, params, data, headers, cookies);
    }
}
exports.ScrapingBeeClient = ScrapingBeeClient;
