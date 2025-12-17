"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingBeeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const utils_1 = require("./utils");
const HTML_API_URL = 'https://app.scrapingbee.com/api/v1/';
const GOOGLE_API_URL = 'https://app.scrapingbee.com/api/v1/store/google';
const AMAZON_SEARCH_API_URL = 'https://app.scrapingbee.com/api/v1/amazon/search';
const AMAZON_PRODUCT_API_URL = 'https://app.scrapingbee.com/api/v1/amazon/product';
const WALMART_SEARCH_API_URL = 'https://app.scrapingbee.com/api/v1/walmart/search';
const WALMART_PRODUCT_API_URL = 'https://app.scrapingbee.com/api/v1/walmart/product';
const CHATGPT_API_URL = 'https://app.scrapingbee.com/api/v1/chatgpt';
const YOUTUBE_SEARCH_API_URL = 'https://app.scrapingbee.com/api/v1/youtube/search';
const YOUTUBE_METADATA_API_URL = 'https://app.scrapingbee.com/api/v1/youtube/metadata';
const YOUTUBE_TRANSCRIPT_API_URL = 'https://app.scrapingbee.com/api/v1/youtube/transcript';
const YOUTUBE_TRAINABILITY_API_URL = 'https://app.scrapingbee.com/api/v1/youtube/trainability';
const USAGE_API_URL = 'https://app.scrapingbee.com/api/v1/usage';
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
            endpoint: HTML_API_URL,
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
            endpoint: HTML_API_URL,
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
    amazonProduct(config) {
        const params = Object.assign({ query: config.query }, config.params);
        return this.request({
            method: 'GET',
            endpoint: AMAZON_PRODUCT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    walmartSearch(config) {
        const params = Object.assign({ query: config.query }, config.params);
        return this.request({
            method: 'GET',
            endpoint: WALMART_SEARCH_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    walmartProduct(config) {
        const params = Object.assign({ product_id: config.product_id }, config.params);
        return this.request({
            method: 'GET',
            endpoint: WALMART_PRODUCT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    chatGPT(config) {
        const params = Object.assign({ prompt: config.prompt }, config.params);
        return this.request({
            method: 'GET',
            endpoint: CHATGPT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    youtubeSearch(config) {
        const params = Object.assign({ search: config.search }, config.params);
        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_SEARCH_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    youtubeMetadata(config) {
        const params = {
            video_id: config.video_id,
        };
        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_METADATA_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    youtubeTranscript(config) {
        const params = Object.assign({ video_id: config.video_id }, config.params);
        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_TRANSCRIPT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    youtubeTrainability(config) {
        const params = {
            video_id: config.video_id,
        };
        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_TRAINABILITY_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    htmlApi(config) {
        var _a;
        let params = Object.assign(Object.assign({}, config.params), { url: config.url, cookies: config.cookies });
        let headers = utils_1.process_headers(config.headers);
        if (Object.keys((_a = config.headers) !== null && _a !== void 0 ? _a : {}).length > 0) {
            params.forward_headers = true;
        }
        return this.request({
            method: config.method || 'GET',
            endpoint: HTML_API_URL,
            params: utils_1.process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }
    usage(config = {}) {
        return this.request({
            method: 'GET',
            endpoint: USAGE_API_URL,
            params: {},
            retries: config.retries,
            timeout: config.timeout,
        });
    }
}
exports.ScrapingBeeClient = ScrapingBeeClient;
