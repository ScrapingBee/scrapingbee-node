import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import axiosRetry from 'axios-retry';

import { process_params, process_headers } from './utils';

const API_URL: string = 'https://app.scrapingbee.com/api/v1/';

export type SpbParams = {
    block_ads?: boolean;
    block_resources?: boolean;
    cookies?: string | Record<string, any>;
    country_code?: string;
    custom_google?: boolean;
    device?: string;
    extract_rules?: object | string;
    forward_headers?: boolean;
    forward_headers_pure?: boolean;
    js_scenario?: object | string;
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
    wait_browser?: string | Array<string>;
    wait_for?: string;
    window_height?: number;
    window_width?: number;
} & {
    [key: string]: any;
};

export interface SpbConfig {
    url: string;
    headers?: Record<string, any>;
    cookies?: string | Record<string, any>;
    params?: SpbParams;
    data?: any;
    retries?: number;
    timeout?: number;
}

export class ScrapingBeeClient {
    readonly api_key: string;

    constructor(api_key: string) {
        this.api_key = api_key;
    }

    private request(method: string, config: SpbConfig): AxiosPromise {
        let params = config.params || {};

        // Headers
        let headers = process_headers(config.headers);
        if (Object.keys(config.headers ?? {}).length > 0) {
            params.forward_headers = true;
        }

        // Cookies
        params.cookies = config.cookies;

        // Other query params
        params['api_key'] = this.api_key;
        params['url'] = config.url;
        params = process_params(params);

        let axios_params: AxiosRequestConfig = {
            method: method as Method,
            headers: headers,
            params: params,
            data: config.data,
            responseType: 'arraybuffer',
            timeout: config.timeout ?? 0,
        };

        // Retry policy
        if (config.retries !== undefined) {
            axiosRetry(axios, { retries: config.retries });
        }

        return axios(API_URL, axios_params);
    }

    public get(config: SpbConfig) {
        return this.request('GET', config);
    }

    public post(config: SpbConfig) {
        return this.request('POST', config);
    }
}
