import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { deprecate } from 'util';
import axiosRetry from 'axios-retry';

import { process_params, process_headers } from './utils';

const HTML_API_URL: string = 'https://app.scrapingbee.com/api/v1/';
const GOOGLE_API_URL: string = 'https://app.scrapingbee.com/api/v1/store/google';
const AMAZON_SEARCH_API_URL: string = 'https://app.scrapingbee.com/api/v1/amazon/search';
const AMAZON_PRODUCT_API_URL: string = 'https://app.scrapingbee.com/api/v1/amazon/product';
const WALMART_SEARCH_API_URL: string = 'https://app.scrapingbee.com/api/v1/walmart/search';
const WALMART_PRODUCT_API_URL: string = 'https://app.scrapingbee.com/api/v1/walmart/product';
const CHATGPT_API_URL: string = 'https://app.scrapingbee.com/api/v1/chatgpt';
const YOUTUBE_SEARCH_API_URL: string = 'https://app.scrapingbee.com/api/v1/youtube/search';
const YOUTUBE_METADATA_API_URL: string = 'https://app.scrapingbee.com/api/v1/youtube/metadata';
const YOUTUBE_TRANSCRIPT_API_URL: string = 'https://app.scrapingbee.com/api/v1/youtube/transcript';
const YOUTUBE_TRAINABILITY_API_URL: string = 'https://app.scrapingbee.com/api/v1/youtube/trainability';
const USAGE_API_URL: string = 'https://app.scrapingbee.com/api/v1/usage';


// HTML API
export type HtmlApiParams = {
    ai_extract_rules?: object | string;
    ai_query?: string;
    ai_selector?: string;
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
    return_page_markdown?: boolean;
    return_page_source?: boolean;
    return_page_text?: boolean;
    scraping_config?: string;
    screenshot?: boolean;
    screenshot_full_page?: boolean;
    screenshot_selector?: string;
    session_id?: number;
    stealth_proxy?: boolean;
    timeout?: number;
    transparent_status_code?: boolean;
    wait?: number;
    wait_browser?: string;
    wait_for?: string;
    window_height?: number;
    window_width?: number;
} & {
    [key: string]: any;
};

export interface HtmlApiConfig {
    url: string;
    method?: 'GET' | 'POST' | 'PUT';
    headers?: Record<string, any>;
    cookies?: string | Record<string, any>;
    params?: HtmlApiParams;
    data?: any;
    retries?: number;
    timeout?: number;
}

// GOOGLE

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

export interface GoogleSearchConfig {
    search: string;
    params?: GoogleSearchParams;
    retries?: number;
    timeout?: number;
}

// AMAZON

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

export interface AmazonSearchConfig {
    query: string;
    params?: AmazonSearchParams;
    retries?: number;
    timeout?: number;
}

export type AmazonProductParams = {
    add_html?: boolean;
    autoselect_variant?: boolean;
    country?: string;
    currency?: string;
    device?: string;
    domain?: string;
    language?: string;
    light_request?: boolean;
    screenshot?: boolean;
    zip_code?: string;
} & {
    [key: string]: any;
};

export interface AmazonProductConfig {
    query: string;
    params?: AmazonProductParams;
    retries?: number;
    timeout?: number;
}

// WALMART

export type WalmartSearchParams = {
    add_html?: boolean;
    delivery_zip?: string;
    device?: string;
    domain?: string;
    fulfillment_speed?: string;
    fulfillment_type?: string;
    light_request?: boolean;
    max_price?: number;
    min_price?: number;
    screenshot?: boolean;
    sort_by?: string;
    store_id?: string;
} & {
    [key: string]: any;
};

export interface WalmartSearchConfig {
    query: string;
    params?: WalmartSearchParams;
    retries?: number;
    timeout?: number;
}

export type WalmartProductParams = {
    add_html?: boolean;
    delivery_zip?: string;
    device?: string;
    domain?: string;
    light_request?: boolean;
    screenshot?: boolean;
    store_id?: string;
} & {
    [key: string]: any;
};

export interface WalmartProductConfig {
    product_id: string;
    params?: WalmartProductParams;
    retries?: number;
    timeout?: number;
}

// CHATGPT

export type ChatGPTParams = {
    add_html?: boolean;
    country_code?: string;
    search?: boolean;
} & {
    [key: string]: any;
};

export interface ChatGPTConfig {
    prompt: string;
    params?: ChatGPTParams;
    retries?: number;
    timeout?: number;
}

// YOUTUBE

export type YouTubeSearchParams = {
    '360'?: boolean;
    '3d'?: boolean;
    '4k'?: boolean;
    creative_commons?: boolean;
    duration?: string;
    hd?: boolean;
    hdr?: boolean;
    live?: boolean;
    location?: boolean;
    purchased?: boolean;
    sort_by?: string;
    subtitles?: boolean;
    type?: string;
    upload_date?: string;
    vr180?: boolean;
} & {
    [key: string]: any;
};

export interface YouTubeSearchConfig {
    search: string;
    params?: YouTubeSearchParams;
    retries?: number;
    timeout?: number;
}

export interface YouTubeMetadataConfig {
    video_id: string;
    retries?: number;
    timeout?: number;
}

export type YouTubeTranscriptParams = {
    language?: string;
    transcript_origin?: string;
} & {
    [key: string]: any;
};

export interface YouTubeTranscriptConfig {
    video_id: string;
    params?: YouTubeTranscriptParams;
    retries?: number;
    timeout?: number;
}

export interface YouTubeTrainabilityConfig {
    video_id: string;
    retries?: number;
    timeout?: number;
}

// USAGE

export interface UsageConfig {
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

        /**
     * @deprecated Use htmlApi() instead. This method will be removed in version 2.0.0.
     */
    public get = deprecate((config: HtmlApiConfig): AxiosPromise => {
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
            endpoint: HTML_API_URL,
            params: process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }, 'ScrapingBeeClient.get() is deprecated. Please use client.htmlApi() instead. This method will be removed in version 2.0.0.');

    /**
     * @deprecated Use htmlApi() instead. This method will be removed in version 2.0.0.
     */
    public post = deprecate((config: HtmlApiConfig): AxiosPromise => {
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
            endpoint: HTML_API_URL,
            params: process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }, 'ScrapingBeeClient.post() is deprecated. Please use client.htmlApi() instead. This method will be removed in version 2.0.0.');

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

    public amazonProduct(config: AmazonProductConfig): AxiosPromise {
        const params: Record<string, any> = {
            query: config.query,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: AMAZON_PRODUCT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public walmartSearch(config: WalmartSearchConfig): AxiosPromise {
        const params: Record<string, any> = {
            query: config.query,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: WALMART_SEARCH_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public walmartProduct(config: WalmartProductConfig): AxiosPromise {
        const params: Record<string, any> = {
            product_id: config.product_id,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: WALMART_PRODUCT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public chatGPT(config: ChatGPTConfig): AxiosPromise {
        const params: Record<string, any> = {
            prompt: config.prompt,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: CHATGPT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public youtubeSearch(config: YouTubeSearchConfig): AxiosPromise {
        const params: Record<string, any> = {
            search: config.search,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_SEARCH_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public youtubeMetadata(config: YouTubeMetadataConfig): AxiosPromise {
        const params: Record<string, any> = {
            video_id: config.video_id,
        };

        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_METADATA_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public youtubeTranscript(config: YouTubeTranscriptConfig): AxiosPromise {
        const params: Record<string, any> = {
            video_id: config.video_id,
            ...config.params,
        };

        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_TRANSCRIPT_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public youtubeTrainability(config: YouTubeTrainabilityConfig): AxiosPromise {
        const params: Record<string, any> = {
            video_id: config.video_id,
        };

        return this.request({
            method: 'GET',
            endpoint: YOUTUBE_TRAINABILITY_API_URL,
            params,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public htmlApi(config: HtmlApiConfig): AxiosPromise {
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
            method: config.method || 'GET',
            endpoint: HTML_API_URL,
            params: process_params(params),
            headers: headers,
            data: config.data,
            retries: config.retries,
            timeout: config.timeout,
        });
    }

    public usage(config: UsageConfig = {}): AxiosPromise {
        return this.request({
            method: 'GET',
            endpoint: USAGE_API_URL,
            params: {},
            retries: config.retries,
            timeout: config.timeout,
        });
    }

}
