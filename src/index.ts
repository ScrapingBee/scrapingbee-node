import axios, {AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { LIB_VERSION } from './version';

const API_URL: string = 'https://app.scrapingbee.com/api/v1/';
const DEFAULT_HEADERS: Record<string, any> = { 'User-Agent': 'ScrapingBee-Node/' + LIB_VERSION };

function process_js_snippet(js_snippet: string): string {
    return Buffer.from(js_snippet).toString('base64');
}

function process_cookies(cookies: string | Record<string, string>): string {
    if (typeof cookies === 'string') {
        return cookies;
    }

    // It's an object
    var cookies_array: Array<string> = [];
    for (let key in cookies) {
        cookies_array.push(`${key}=${cookies[key]}`);
    }
    return cookies_array.join(';');
}

function process_extract_rules(extract_rules: object): string {
    return JSON.stringify(extract_rules);
}

function is_empty(value: any) {
    switch (typeof value) {
        case 'string':
            return value === '';
        case 'object':
            return value && Object.keys(value).length === 0 && value.constructor === Object;
        default:
            return false;
    }
}

function process_params(params: Record<string, any>) {
    var clean_params: Record<string, any> = {};

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

function process_headers(headers: Record<string, any>, prefix: string = 'Spb-'): Record<string, any> {
    var new_headers: Record<string, any> = {};

    for (let key in headers) {
        new_headers[`${prefix}${key}`] = headers[key];
    }

    if (Object.keys(new_headers).length > 0) {
        new_headers['forward_headers'] = true;
    }
    new_headers = Object.assign(new_headers, DEFAULT_HEADERS);

    return new_headers;
}

export class ScrapingBeeClient {
    readonly api_key: string;

    constructor(api_key: string) {
        this.api_key = api_key;
    }

    private request(
        method: string,
        url: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        cookies?: string | Record<string, string>,
        data?: any
    ): AxiosPromise {
        headers = process_headers(headers);

        if (cookies != null) {
            params['cookies'] = cookies;
        }

        params['api_key'] = this.api_key;
        params['url'] = url;
        params = process_params(params);

        var axios_params: AxiosRequestConfig = {
            method: method as Method,
            headers: headers,
            params: params,
            data: data,
            responseType: 'text'
        };

        return axios(API_URL, axios_params);
    }

    public get(
        url: string,
        params?: Record<string, any>,
        headers?: Record<string, string>,
        cookies?: string | Record<string, string>
    ) {
        return this.request('GET', url, params, headers, cookies);
    }

    public post(
        url: string,
        params?: Record<string, any>,
        headers?: Record<string, string>,
        cookies?: string | Record<string, string>,
        data?: any
    ) {
        return this.request('POST', url, params, data, headers, cookies);
    }
}
