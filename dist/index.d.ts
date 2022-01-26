import { AxiosPromise } from 'axios';
export declare class ScrapingBeeClient {
    readonly api_key: string;
    constructor(api_key: string);
    private request;
    get(config?: Record<string, any>): AxiosPromise<never>;
    post(config?: Record<string, any>): AxiosPromise<never>;
}
