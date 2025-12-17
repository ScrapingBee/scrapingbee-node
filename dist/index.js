"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingBeeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const utils_1 = require("./utils");
const API_URL = 'https://app.scrapingbee.com/api/v1/'; // WILL BE REMOVED IN A FUTURE VERSION
const GOOGLE_API_URL = 'https://app.scrapingbee.com/api/v1/store/google';
const AMAZON_SEARCH_API_URL = 'https://app.scrapingbee.com/api/v1/amazon/search';
class ScrapingBeeClient {
    constructor(api_key) {
        this.api_key = api_key;
    }
    request(config) {
        var _a;
        config.params['api_key'] = this.api_key;
        const axiosConfig = {
            method: config.method,
            url: config.endpoint,
            params: config.params,
            headers: config.headers,
            data: config.data,
            responseType: 'arraybuffer',
            timeout: (_a = config.timeout) !== null && _a !== void 0 ? _a : 0,
        };
        // Retry policy
        if (config.retries !== undefined) {
            axios_retry_1.default(axios_1.default, { retries: config.retries });
        }
        return axios_1.default(axiosConfig);
    }
    // WILL BE REMOVED IN A FUTURE VERSION
    get(config) {
        var _a;
        let params = Object.assign(Object.assign({}, config.params), { url: config.url, cookies: config.cookies });
        let headers = utils_1.process_headers(config.headers);
        if (Object.keys((_a = config.headers) !== null && _a !== void 0 ? _a : {}).length > 0) {
            params.forward_headers = true;
        }
        return this.request({
            method: 'GET',
            endpoint: API_URL,
            params: utils_1.process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    // WILL BE REMOVED IN A FUTURE VERSION
    post(config) {
        var _a;
        let params = Object.assign(Object.assign({}, config.params), { url: config.url, cookies: config.cookies });
        let headers = utils_1.process_headers(config.headers);
        if (Object.keys((_a = config.headers) !== null && _a !== void 0 ? _a : {}).length > 0) {
            params.forward_headers = true;
        }
        return this.request({
            method: 'POST',
            endpoint: API_URL,
            params: utils_1.process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    googleSearch(config) {
        const params = Object.assign({ search: config.search }, config.params);
        return this.request({
            method: 'GET',
            endpoint: GOOGLE_API_URL,
            params: utils_1.process_params(params),
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    amazonSearch(config) {
        const params = Object.assign({ query: config.query }, config.params);
        return this.request({
            method: 'GET',
            endpoint: AMAZON_SEARCH_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
}
exports.ScrapingBeeClient = ScrapingBeeClient;
