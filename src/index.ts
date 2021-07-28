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
        config: Record<string, any> = {},
    ): AxiosPromise {
        let params = config.params || {};

        let raw_headers = config.headers || {};
        let headers = process_headers(raw_headers);
        if (headers != {}) {
            params['forward_headers'] = true;
        }
        headers["User-Agent"] = `ScrapingBee-Node/${ LIB_VERSION }`

        let cookies = config.cookies || null;
        if (cookies != null) {
            params['cookies'] = cookies;
        }

        let url = config.url;

        let data = config.data || {};

        params['api_key'] = this.api_key;
        params['url'] = url;
        params = process_params(params);

        let axios_params: AxiosRequestConfig = {
            method: method as Method,
            headers: headers,
            params: params,
            data: data,
            responseType: 'arraybuffer',
        };

        return axios(API_URL, axios_params);
    }

    public get(
        config?: Record<string, any>,
    ) {
        return this.request('GET', config);
    }

    public post(
        config?: Record<string, any>,
    ) {
        return this.request('POST', config);
    }
}
