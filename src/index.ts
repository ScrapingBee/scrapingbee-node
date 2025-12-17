import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import axiosRetry from 'axios-retry';

import { process_params, process_headers } from './utils';

const API_URL: string = 'https://app.scrapingbee.com/api/v1/'; // WILL BE REMOVED IN A FUTURE VERSION
const GOOGLE_API_URL: string = 'https://app.scrapingbee.com/api/v1/store/google';
const AMAZON_SEARCH_API_URL: string = 'https://app.scrapingbee.com/api/v1/amazon/search';

// WILL BE REMOVED IN A FUTURE VERSION
export type SpbParams = {
    block_ads?: boolean;
    block_resources?: boolean;
    cookies?: string | Record<string, any>;
    country_code?: string;
    custom_google?: boolean;
    device?: string;
    extract_rules?: object | string;
    ai_extract_rules?: { summary: string };
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

export type GoogleSearchParams = {
    add_html?: boolean;
    country_code?: string;
    device?: string;
    extra_params?: string;
    language?: string;
    light_request?: boolean;
    nfpr?: boolean;
    page?: number;
    search_type?: string;
} & {
    [key: string]: any;
};

export type AmazonSearchParams = {
    add_html?: boolean;
    category_id?: string;
    country?: string;
    currency?: string;
    device?: string;
    domain?: string;
    language?: string;
    light_request?: boolean;
    merchant_id?: string;
    pages?: number;
    screenshot?: boolean;
    sort_by?: string;
    start_page?: number;
    zip_code?: string;
} & {
    [key: string]: any;
};

// WILL BE REMOVED IN A FUTURE VERSION
export interface SpbConfig {
    url: string;
    headers?: Record<string, any>;
    cookies?: string | Record<string, any>;
    params?: SpbParams;
    data?: any;
    retries?: number;
    timeout?: number;
}

export interface GoogleSearchConfig {
    search: string;
    params?: GoogleSearchParams;
    retries?: number;
    timeout?: number;
}

export interface AmazonSearchConfig {
    query: string;
    params?: AmazonSearchParams;
    retries?: number;
    timeout?: number;
}

export class ScrapingBeeClient {
    readonly api_key: string;

    constructor(api_key: string) {
        this.api_key = api_key;
    }

    private request(config: Record<string, any>): AxiosPromise {
        config.params['api_key'] = this.api_key;

        const axiosConfig: AxiosRequestConfig = {
            method: config.method as Method,
            url: config.endpoint,
            params: config.params,
            headers: config.headers,
            data: config.data,
            responseType: 'arraybuffer',
            timeout: config.timeout ?? 0,
        };

        // Retry policy
        if (config.retries !== undefined) {
            axiosRetry(axios, { retries: config.retries });
        }

        return axios(axiosConfig);
    }

    // WILL BE REMOVED IN A FUTURE VERSION
    public get(config: SpbConfig): AxiosPromise {
        let params: Record<string, any> = {
            ...config.params,
            url: config.url,
            cookies: config.cookies
        };

        let headers = process_headers(config.headers);
        if (Object.keys(config.headers ?? {}).length > 0) {
            params.forward_headers = true;
        }

        return this.request({
            method: 'GET',
            endpoint: API_URL,
            params: process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    // WILL BE REMOVED IN A FUTURE VERSION
    public post(config: SpbConfig): AxiosPromise {
        let params: Record<string, any> = {
            ...config.params,
            url: config.url,
            cookies: config.cookies
        };

        let headers = process_headers(config.headers);
        if (Object.keys(config.headers ?? {}).length > 0) {
            params.forward_headers = true;
        }

        return this.request({
            method: 'POST',
            endpoint: API_URL,
            params: process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public googleSearch(config: GoogleSearchConfig): AxiosPromise {
        const params: Record<string, any> = {
            search: config.search,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: GOOGLE_API_URL,
            params: process_params(params),
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public amazonSearch(config: AmazonSearchConfig): AxiosPromise {
        const params: Record<string, any> = {
            query: config.query,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: AMAZON_SEARCH_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

}
