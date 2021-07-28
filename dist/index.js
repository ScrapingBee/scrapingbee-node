"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingBeeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const version_1 = require("./version");
const utils_1 = require("./utils");
const API_URL = 'https://app.scrapingbee.com/api/v1/';
class ScrapingBeeClient {
    constructor(api_key) {
        this.api_key = api_key;
    }
    request(method, config = {}) {
        let params = config.params || {};
        let raw_headers = config.headers || {};
        let headers = utils_1.process_headers(raw_headers);
        if (headers != {}) {
            params['forward_headers'] = true;
        }
        headers["User-Agent"] = `ScrapingBee-Node/${version_1.LIB_VERSION}`;
        let cookies = config.cookies || null;
        if (cookies != null) {
            params['cookies'] = cookies;
        }
        let url = config.url;
        let data = config.data || {};
        params['api_key'] = this.api_key;
        params['url'] = url;
        params = utils_1.process_params(params);
        let axios_params = {
            method: method,
            headers: headers,
            params: params,
            data: data,
            responseType: 'arraybuffer',
        };
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
