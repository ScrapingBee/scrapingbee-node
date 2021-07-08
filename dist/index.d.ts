import { AxiosPromise } from 'axios';
export declare class ScrapingBeeClient {
    readonly api_key: string;
    constructor(api_key: string);
    private request;
    get(url: string, params?: Record<string, any>, headers?: Record<string, string>, cookies?: string | Record<string, string>): AxiosPromise<any>;
    post(url: string, params?: Record<string, any>, headers?: Record<string, string>, cookies?: string | Record<string, string>, data?: any): AxiosPromise<any>;
}
