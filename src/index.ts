import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { LIB_VERSION } from './version';

import { process_params, process_headers } from './utils';

const API_URL: string = 'https://app.scrapingbee.com/api/v1/';

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
            responseType: 'arraybuffer',
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
