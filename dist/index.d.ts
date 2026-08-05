import { AxiosPromise } from 'axios';
export declare type HtmlApiParams = {
    tag?: string;
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
    max_cost?: number;
    mode?: 'auto';
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
export declare type GoogleSearchParams = {
    tag?: string;
    add_html?: boolean;
    country_code?: string;
    date_range?: string;
    device?: string;
    extra_params?: string;
    language?: string;
    latitude?: number;
    light_request?: boolean;
    longitude?: number;
    max_price?: number;
    min_price?: number;
    nfpr?: boolean;
    page?: number;
    pages?: number;
    radius?: number;
    search_type?: string;
    sort_by?: string;
} & {
    [key: string]: any;
};
export interface GoogleSearchConfig {
    search: string;
    params?: GoogleSearchParams;
    retries?: number;
    timeout?: number;
}
export declare type AmazonSearchParams = {
    tag?: string;
    add_html?: boolean;
    autoselect_variant?: boolean;
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
export declare type AmazonProductParams = {
    tag?: string;
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
export declare type WalmartSearchParams = {
    tag?: string;
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
    start_page?: number;
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
export declare type WalmartProductParams = {
    tag?: string;
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
export declare type ChatGPTParams = {
    tag?: string;
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
export declare type YouTubeSearchParams = {
    tag?: string;
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
export declare type YouTubeMetadataParams = {
    tag?: string;
} & {
    [key: string]: any;
};
export interface YouTubeMetadataConfig {
    video_id: string;
    params?: YouTubeMetadataParams;
    retries?: number;
    timeout?: number;
}
export declare type YouTubeSubtitlesParams = {
    tag?: string;
    language?: string;
    subtitle_origin?: string;
} & {
    [key: string]: any;
};
export interface YouTubeSubtitlesConfig {
    video_id: string;
    params?: YouTubeSubtitlesParams;
    retries?: number;
    timeout?: number;
}
export declare type FastSearchParams = {
    country_code?: string;
    language?: string;
    page?: number;
    tag?: string;
} & {
    [key: string]: any;
};
export interface FastSearchConfig {
    search: string;
    params?: FastSearchParams;
    retries?: number;
    timeout?: number;
}
export declare type AmazonPricingParams = {
    tag?: string;
    add_html?: boolean;
    country?: string;
    currency?: string;
    device?: string;
    domain?: string;
    language?: string;
    light_request?: boolean;
    zip_code?: string;
} & {
    [key: string]: any;
};
export interface AmazonPricingConfig {
    asin: string;
    params?: AmazonPricingParams;
    retries?: number;
    timeout?: number;
}
export declare type GeminiParams = {
    tag?: string;
    add_html?: boolean;
    country_code?: string;
} & {
    [key: string]: any;
};
export interface GeminiConfig {
    prompt: string;
    params?: GeminiParams;
    retries?: number;
    timeout?: number;
}
export interface UsageConfig {
    retries?: number;
    timeout?: number;
}
export declare class ScrapingBeeClient {
    readonly api_key: string;
    constructor(api_key: string);
    private request;
    googleSearch(config: GoogleSearchConfig): AxiosPromise;
    amazonSearch(config: AmazonSearchConfig): AxiosPromise;
    amazonProduct(config: AmazonProductConfig): AxiosPromise;
    walmartSearch(config: WalmartSearchConfig): AxiosPromise;
    walmartProduct(config: WalmartProductConfig): AxiosPromise;
    chatGPT(config: ChatGPTConfig): AxiosPromise;
    youtubeSearch(config: YouTubeSearchConfig): AxiosPromise;
    youtubeMetadata(config: YouTubeMetadataConfig): AxiosPromise;
    youtubeSubtitles(config: YouTubeSubtitlesConfig): AxiosPromise;
    fastSearch(config: FastSearchConfig): AxiosPromise;
    amazonPricing(config: AmazonPricingConfig): AxiosPromise;
    gemini(config: GeminiConfig): AxiosPromise;
    htmlApi(config: HtmlApiConfig): AxiosPromise;
    usage(config?: UsageConfig): AxiosPromise;
}
