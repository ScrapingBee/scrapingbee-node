"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingBeeClient = void 0;
const axios_1 = __importDefault(require("axios"));
const version_1 = require("./version");
const API_URL = 'https://app.scrapingbee.com/api/v1/';
const DEFAULT_HEADERS = { 'User-Agent': 'ScrapingBee-Node/' + version_1.LIB_VERSION };
function process_js_snippet(js_snippet) {
    return Buffer.from(js_snippet).toString('base64');
}
function process_cookies(cookies) {
    if (typeof cookies === 'string') {
        return cookies;
    }
    // It's an object
    var cookies_array = [];
    for (let key in cookies) {
        cookies_array.push(`${key}=${cookies[key]}`);
    }
    return cookies_array.join(';');
}
function process_extract_rules(extract_rules) {
    return JSON.stringify(extract_rules);
}
function is_empty(value) {
    switch (typeof value) {
        case 'string':
            return value === '';
        case 'object':
            return value && Object.keys(value).length === 0 && value.constructor === Object;
        default:
            return false;
    }
}
function process_params(params) {
    var clean_params = {};
    for (let key in params) {
        if (is_empty(params[key])) {
            continue;
        }
        switch (key) {
            case 'js_snippet':
                clean_params[key] = process_js_snippet(params[key]);
                break;
            case 'cookies':
                clean_params[key] = process_cookies(params[key]);
                break;
            case 'extract_rules':
                clean_params[key] = process_extract_rules(params[key]);
                break;
            default:
                clean_params[key] = params[key];
        }
    }
    return clean_params;
}
function process_headers(headers, prefix = 'Spb-') {
    var new_headers = {};
    for (let key in headers) {
        new_headers[`${prefix}${key}`] = headers[key];
    }
    if (Object.keys(new_headers).length > 0) {
        new_headers['forward_headers'] = true;
    }
    new_headers = Object.assign(new_headers, DEFAULT_HEADERS);
    return new_headers;
}
class ScrapingBeeClient {
    constructor(api_key) {
        this.api_key = api_key;
    }
    request(method, url, params = {}, headers = {}, cookies, data) {
        headers = process_headers(headers);
        if (cookies != null) {
            params['cookies'] = cookies;
        }
        params['api_key'] = this.api_key;
        params['url'] = url;
        params = process_params(params);
        var axios_params = {
            method: method,
            headers: headers,
            params: params,
            data: data,
            responseType: 'text'
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
