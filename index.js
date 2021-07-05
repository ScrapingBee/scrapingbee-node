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
            return cookies;
        default:
            Error('Cookies must be a string or object');
    }
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
