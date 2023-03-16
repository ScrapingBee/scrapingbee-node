import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import axiosRetry from 'axios-retry';

import { process_params, process_headers } from './utils';

const API_URL: string = 'https://app.scrapingbee.com/api/v1/';

export interface ScbParams {
    block_ads?: boolean;
    block_resources?: boolean;
    cookies?: string;
    country_code?: string;
    custom_google?: boolean;
    device?: string;
    extract_rules?: string;
    forward_headers?: boolean;
    forward_headers_pure?: boolean;
    js_scenario?: string;
    json_response?: boolean;
    own_proxy?: string;
    premium_proxy?: boolean;
    render_js?: boolean;
    return_page_source?: boolean;
    screenshot?: boolean;
    screenshot_full_page?: boolean;
    screenshot_selector?: string;
    session_id?: number;
    stealth_proxy?: boolean;
    timeout?: number;
    transparent_status_code?: boolean;
    wait?: number;
    wait_for?: string;
    window_height?: number;
    window_width?: number;
}

export interface ScbConfig {
    url: string;
    headers?: Record<string, any>;
    cookies?: string | Record<string, any>;
    params?: Record<string, any> | ScbParams;
    data?: any;
    retries?: number;
}

export class ScrapingBeeClient {
    readonly api_key: string;

    constructor(api_key: string) {
        this.api_key = api_key;
    }

    private request(method: string, config: ScbConfig): AxiosPromise {
        let params = config.params || {};

        // Headers
        let raw_headers = config.headers || {};
        let headers = process_headers(raw_headers);
        if (Object.keys(raw_headers).length > 0) {
            params['forward_headers'] = true;
        }

        // Cookies
        let cookies = config.cookies || null;
        if (cookies != null) {
            params['cookies'] = cookies;
        }

        // Other query params
        params['api_key'] = this.api_key;
        params['url'] = config.url;
        params = process_params(params);

        // Request body
        let data = config.data || {};

        let axios_params: AxiosRequestConfig = {
            method: method as Method,
            headers: headers,
            params: params,
            data: data,
            responseType: 'arraybuffer',
        };

        // Retry policy
        if (config.retries !== undefined) {
            axiosRetry(axios, { retries: config.retries });
        }

        return axios(API_URL, axios_params);
    }

    public get(config: ScbConfig) {
        return this.request('GET', config);
    }

    public post(config: ScbConfig) {
        return this.request('POST', config);
    }
}
