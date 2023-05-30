import { LIB_VERSION } from './version';

const DEFAULT_HEADERS: Record<string, any> = { 'User-Agent': `ScrapingBee-Node/${LIB_VERSION}` };

function process_js_snippet(js_snippet: string): string {
    return Buffer.from(js_snippet).toString('base64');
}

function process_cookies(cookies: string | Record<string, any>): string {
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

function process_json_stringify_param(param: object): string {
    return JSON.stringify(param);
}

export function is_empty(value: any) {
    if (typeof value === 'number' || typeof value === 'boolean') {
        return false;
    }
    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
    }

    return !value;
}

export function process_params(params: Record<string, any>) {
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

export function process_headers(headers: Record<string, any> = {}, prefix: string = 'Spb-'): Record<string, any> {
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
