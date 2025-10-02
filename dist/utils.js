"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process_headers = exports.process_params = exports.is_empty = void 0;
const version_1 = require("./version");
const DEFAULT_HEADERS = { 'User-Agent': `ScrapingBee-Node/${version_1.LIB_VERSION}` };
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
function process_json_stringify_param(param) {
    return JSON.stringify(param);
}
function is_empty(value) {
    if (typeof value === 'number' || typeof value === 'boolean') {
        return false;
    }
    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
    }
    return !value;
}
exports.is_empty = is_empty;
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
            case 'js_scenario':
                clean_params[key] =
                    typeof params[key] === 'string' ? params[key] : process_json_stringify_param(params[key]);
                break;
            default:
                clean_params[key] = params[key];
        }
    }
    return clean_params;
}
exports.process_params = process_params;
function process_headers(headers = {}, prefix = 'Spb-') {
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
exports.process_headers = process_headers;
