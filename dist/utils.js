"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process_params = void 0;
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
exports.process_params = process_params;
