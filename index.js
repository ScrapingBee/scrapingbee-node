const axios = require('axios');

const API_URL = 'https://app.scrapingbee.com/api/v1/';
const DEFAULT_HEADERS = { 'User-Agent': 'ScrapingBee-Node/' + require('./package.json').version };

function process_url(url) {
    return encodeURIComponent(url);
}

function process_js_snippet(js_snippet) {
    return Buffer.from(js_snippet).toString('base64');
}

function process_cookies(cookies) {
    switch (typeof cookies) {
        case 'string':
            return cookies;
        case 'object':
            var cookies_array = [];
            for (key in cookies) {
                cookies_array.push('${key}=${cookies[key]}');
            }
            return cookies_array.join(';');
        default:
            Error('Cookies must be a string or object');
    }
}

function process_extract_rules(extract_rules) {
    if (typeof extract_rules === 'object') {
        return JSON.stringify(extract_rules);
    } else {
        Error('Extract rules must be an object');
    }
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

    for (key in params) {
        if (is_empty(params[key])) {
            continue;
        }

        switch (key) {
            case 'url':
                clean_params[key] = process_url(params[key]);
                break;
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
    for (key in headers) {
        new_headers[prefix + key] = headers[key];
    }

    return new_headers;
}

export class ScrapingBeeClient {
    constructor(api_key) {
        this.api_key = api_key;
    }

    request(method, url, params = null, data = null, headers = null, cookies = null) {
        if (params == null) {
            params = {};
        }

        // Process headers and set forward_headers
        if (headers != null) {
            headers = process_headers(headers);
            params['forward_headers'] = true;
        } else {
            headers = {};
        }
        headers = Object.assign(headers, DEFAULT_HEADERS);

        // Add cookies to params
        if (cookies != null) {
            // ScrapingBee reads cookies from url parameters
            params['cookies'] = cookies;
        }

        // Process params
        params = process_params(params);

        return axios({
            url: '',
            method: method,
            baseURL: API_URL,
            headers: headers,
            params: params,
            data: data,
        });
    }

    get(url, params = null, headers = null, cookies = null) {
        return this.request('get', url, params, null, headers, cookies);
    }

    post(url, params = null, data = null, headers = null, cookies = null) {
        return this.request('post', url, params, data, headers, cookies);
    }
}
