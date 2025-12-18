import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import { ScrapingBeeClient } from '../src';
import { LIB_VERSION } from '../src/version';

var mock = new MockAdapter(axios);

// ============================================
// HTML API
// ============================================

describe('test_ScrapingBeeClient.get', function () {
    var api_key = 'API_KEY';
    var target_url = 'https://httpbin-scrapingbee.cleverapps.io/html';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a simple GET request with correct query params', async function () {
        var res = await client.get({ url: target_url });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['url'], target_url);
        // @ts-ignore
        assert.match(res.config.headers['User-Agent'], /^ScrapingBee-Node\//);
    });

    it('should add the render_js query param', async function () {
        var res = await client.get({ url: target_url, params: { render_js: true } });
        assert.deepStrictEqual(res.config.params['render_js'], true);
    });

    it('should prefix header names with Spb- and set forward_headers', async function () {
        var res = await client.get({ url: target_url, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        // @ts-ignore
        assert.deepStrictEqual(res.config.headers['Spb-Content-Type'], 'text/html; charset=utf-8');
        // @ts-ignore
        assert.deepStrictEqual(res.config.headers['User-Agent'], `ScrapingBee-Node/${LIB_VERSION}`);
        assert.deepStrictEqual(res.config.params['forward_headers'], true);
    });

    it('should format the cookies and add them to the query params', async function () {
        var cookies = { name1: 'value1', name2: 'value2' };
        var res = await client.get({ url: target_url, cookies: cookies });
        assert.deepStrictEqual(res.config.params['cookies'], 'name1=value1;name2=value2');
    });

    it('should format the extract_rules and add them to the query params', async function () {
        var res = await client.get({
            url: target_url,
            params: {
                extract_rules: {
                    title: 'h1',
                    subtitle: '#subtitle',
                },
            },
        });
        assert.deepStrictEqual(
            res.config.params['extract_rules'],
            '{"title":"h1","subtitle":"#subtitle"}'
        );
    });

    it('should format the js_scenario and add them to the query params', async function () {
        var res = await client.get({
            url: target_url,
            params: {
                js_scenario: {
                    instructions: [{ click: '#buttonId' }],
                },
            },
        });
        assert.deepStrictEqual(
            res.config.params['js_scenario'],
            '{"instructions":[{"click":"#buttonId"}]}'
        );
    });
});

describe('test_ScrapingBeeClient.post', function () {
    var api_key = 'API_KEY';
    var target_url = 'https://httpbin-scrapingbee.cleverapps.io/post';
    var client = new ScrapingBeeClient(api_key);
    mock.onPost().reply(201);

    it('should make a simple GET request with correct query params', async function () {
        var res = await client.post({ url: target_url });
        assert.deepStrictEqual(res.status, 201);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['url'], target_url);
        // @ts-ignore
        assert.match(res.config.headers['User-Agent'], /^ScrapingBee-Node\//);
    });
});

describe('test_ScrapingBeeClient.htmlApi', function () {
    var api_key = 'API_KEY';
    var target_url = 'https://httpbin.org/get';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);
    mock.onPost().reply(201);

    it('should make a GET request by default', async function () {
        var res = await client.htmlApi({ url: target_url });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['url'], target_url);
        // @ts-ignore
        assert.match(res.config.headers['User-Agent'], /^ScrapingBee-Node\//);
    });

    it('should make a GET request when explicitly specified', async function () {
        var res = await client.htmlApi({ url: target_url, method: 'GET' });
        assert.deepStrictEqual(res.status, 200);
    });

    it('should make a POST request when specified', async function () {
        var res = await client.htmlApi({
            url: 'https://httpbin.org/post',
            method: 'POST',
            data: 'test=data'
        });
        assert.deepStrictEqual(res.status, 201);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        // @ts-ignore
        assert.match(res.config.headers['User-Agent'], /^ScrapingBee-Node\//);
    });

    it('should add the render_js query param', async function () {
        var res = await client.htmlApi({ url: target_url, params: { render_js: true } });
        assert.deepStrictEqual(res.config.params['render_js'], true);
    });

    it('should handle multiple params correctly', async function () {
        var res = await client.htmlApi({
            url: target_url,
            params: { render_js: true, premium_proxy: true, block_ads: true }
        });
        assert.deepStrictEqual(res.config.params['render_js'], true);
        assert.deepStrictEqual(res.config.params['premium_proxy'], true);
        assert.deepStrictEqual(res.config.params['block_ads'], true);
    });

    it('should prefix header names with Spb- and set forward_headers', async function () {
        var res = await client.htmlApi({
            url: target_url,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
        // @ts-ignore
        assert.deepStrictEqual(res.config.headers['Spb-Content-Type'], 'text/html; charset=utf-8');
        // @ts-ignore
        assert.deepStrictEqual(res.config.headers['User-Agent'], `ScrapingBee-Node/${LIB_VERSION}`);
        assert.deepStrictEqual(res.config.params['forward_headers'], true);
    });

    it('should format the cookies and add them to the query params', async function () {
        var cookies = { name1: 'value1', name2: 'value2' };
        var res = await client.htmlApi({ url: target_url, cookies: cookies });
        assert.deepStrictEqual(res.config.params['cookies'], 'name1=value1;name2=value2');
    });

    it('should pass string cookies directly', async function () {
        var cookies = 'session=abc123;user=john';
        var res = await client.htmlApi({ url: target_url, cookies: cookies });
        assert.deepStrictEqual(res.config.params['cookies'], cookies);
    });

    it('should format the extract_rules and add them to the query params', async function () {
        var res = await client.htmlApi({
            url: target_url,
            params: {
                extract_rules: {
                    title: 'h1',
                    subtitle: '#subtitle',
                },
            },
        });
        assert.deepStrictEqual(
            res.config.params['extract_rules'],
            '{"title":"h1","subtitle":"#subtitle"}'
        );
    });

    it('should format the js_scenario and add them to the query params', async function () {
        var res = await client.htmlApi({
            url: target_url,
            params: {
                js_scenario: {
                    instructions: [{ click: '#buttonId' }],
                },
            },
        });
        assert.deepStrictEqual(
            res.config.params['js_scenario'],
            '{"instructions":[{"click":"#buttonId"}]}'
        );
    });

    it('should format the ai_extract_rules and add them to the query params', async function () {
        var res = await client.htmlApi({
            url: target_url,
            params: {
                ai_extract_rules: {
                    summary: 'Extract the main content',
                },
            },
        });
        assert.deepStrictEqual(
            res.config.params['ai_extract_rules'],
            '{"summary":"Extract the main content"}'
        );
    });

    it('should handle POST with data and params', async function () {
        var res = await client.htmlApi({
            url: 'https://httpbin.org/post',
            method: 'POST',
            data: 'username=user&password=pass',
            params: { render_js: true }
        });
        assert.deepStrictEqual(res.status, 201);
        assert.deepStrictEqual(res.config.params['render_js'], true);
        assert.deepStrictEqual(res.config.data, 'username=user&password=pass');
    });

    it('should handle POST with headers', async function () {
        var res = await client.htmlApi({
            url: 'https://httpbin.org/post',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: 'test=data'
        });
        // @ts-ignore
        assert.deepStrictEqual(res.config.headers['Spb-Content-Type'], 'application/x-www-form-urlencoded');
        assert.deepStrictEqual(res.config.params['forward_headers'], true);
    });
});

// ============================================
// Google Search API
// ============================================

describe('test_ScrapingBeeClient.googleSearch', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.googleSearch({
            search: 'test query',
            params: { language: 'en', country_code: 'us' }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['search'], 'test query');
        assert.deepStrictEqual(res.config.params['language'], 'en');
        assert.deepStrictEqual(res.config.params['country_code'], 'us');
    });

    it('should work with only required param', async function () {
        var res = await client.googleSearch({ search: 'test' });
        assert.deepStrictEqual(res.config.params['search'], 'test');
    });

    it('should handle all optional params', async function () {
        var res = await client.googleSearch({
            search: 'test',
            params: {
                add_html: true,
                device: 'mobile',
                page: 2,
                search_type: 'news',
                light_request: false,
                nfpr: true
            }
        });
        assert.deepStrictEqual(res.config.params['add_html'], true);
        assert.deepStrictEqual(res.config.params['device'], 'mobile');
        assert.deepStrictEqual(res.config.params['page'], 2);
        assert.deepStrictEqual(res.config.params['search_type'], 'news');
        assert.deepStrictEqual(res.config.params['light_request'], false);
        assert.deepStrictEqual(res.config.params['nfpr'], true);
    });
});

// ============================================
// Amazon Search API
// ============================================

describe('test_ScrapingBeeClient.amazonSearch', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.amazonSearch({
            query: 'laptop',
            params: { domain: 'com', language: 'en' }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['query'], 'laptop');
        assert.deepStrictEqual(res.config.params['domain'], 'com');
        assert.deepStrictEqual(res.config.params['language'], 'en');
    });

    it('should work with only required param', async function () {
        var res = await client.amazonSearch({ query: 'phone' });
        assert.deepStrictEqual(res.config.params['query'], 'phone');
    });

    it('should handle all optional params', async function () {
        var res = await client.amazonSearch({
            query: 'laptop',
            params: {
                add_html: true,
                country: 'us',
                currency: 'USD',
                device: 'desktop',
                pages: 2,
                sort_by: 'price_low_to_high',
                start_page: 1
            }
        });
        assert.deepStrictEqual(res.config.params['add_html'], true);
        assert.deepStrictEqual(res.config.params['country'], 'us');
        assert.deepStrictEqual(res.config.params['currency'], 'USD');
        assert.deepStrictEqual(res.config.params['pages'], 2);
        assert.deepStrictEqual(res.config.params['sort_by'], 'price_low_to_high');
    });
});

// ============================================
// Amazon Product API
// ============================================

describe('test_ScrapingBeeClient.amazonProduct', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.amazonProduct({
            query: 'B0D2Q9397Y',
            params: { domain: 'com' }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['query'], 'B0D2Q9397Y');
        assert.deepStrictEqual(res.config.params['domain'], 'com');
    });

    it('should work with only required param', async function () {
        var res = await client.amazonProduct({ query: 'B0D2Q9397Y' });
        assert.deepStrictEqual(res.config.params['query'], 'B0D2Q9397Y');
    });

    it('should handle all optional params', async function () {
        var res = await client.amazonProduct({
            query: 'B0D2Q9397Y',
            params: {
                add_html: true,
                autoselect_variant: true,
                country: 'us',
                currency: 'USD',
                device: 'mobile',
                language: 'en',
                light_request: false,
                screenshot: true
            }
        });
        assert.deepStrictEqual(res.config.params['autoselect_variant'], true);
        assert.deepStrictEqual(res.config.params['screenshot'], true);
        assert.deepStrictEqual(res.config.params['light_request'], false);
    });
});

// ============================================
// Walmart Search API
// ============================================

describe('test_ScrapingBeeClient.walmartSearch', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.walmartSearch({
            query: 'laptop',
            params: { sort_by: 'best_match', device: 'desktop' }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['query'], 'laptop');
        assert.deepStrictEqual(res.config.params['sort_by'], 'best_match');
    });

    it('should work with only required param', async function () {
        var res = await client.walmartSearch({ query: 'tv' });
        assert.deepStrictEqual(res.config.params['query'], 'tv');
    });

    it('should handle all optional params', async function () {
        var res = await client.walmartSearch({
            query: 'laptop',
            params: {
                add_html: true,
                delivery_zip: '10001',
                device: 'mobile',
                fulfillment_speed: 'today',
                max_price: 1000,
                min_price: 100,
                screenshot: true,
                store_id: '12345'
            }
        });
        assert.deepStrictEqual(res.config.params['delivery_zip'], '10001');
        assert.deepStrictEqual(res.config.params['max_price'], 1000);
        assert.deepStrictEqual(res.config.params['min_price'], 100);
        assert.deepStrictEqual(res.config.params['fulfillment_speed'], 'today');
    });
});

// ============================================
// Walmart Product API
// ============================================

describe('test_ScrapingBeeClient.walmartProduct', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.walmartProduct({
            product_id: '123456789',
            params: { device: 'desktop' }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['product_id'], '123456789');
        assert.deepStrictEqual(res.config.params['device'], 'desktop');
    });

    it('should work with only required param', async function () {
        var res = await client.walmartProduct({ product_id: '123456789' });
        assert.deepStrictEqual(res.config.params['product_id'], '123456789');
    });

    it('should handle all optional params', async function () {
        var res = await client.walmartProduct({
            product_id: '123456789',
            params: {
                add_html: true,
                delivery_zip: '10001',
                device: 'tablet',
                domain: 'com',
                light_request: false,
                screenshot: true,
                store_id: '12345'
            }
        });
        assert.deepStrictEqual(res.config.params['delivery_zip'], '10001');
        assert.deepStrictEqual(res.config.params['device'], 'tablet');
        assert.deepStrictEqual(res.config.params['screenshot'], true);
    });
});

// ============================================
// ChatGPT API
// ============================================

describe('test_ScrapingBeeClient.chatGPT', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.chatGPT({
            prompt: 'What is web scraping?',
            params: { search: true }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['prompt'], 'What is web scraping?');
        assert.deepStrictEqual(res.config.params['search'], true);
    });

    it('should work with only required param', async function () {
        var res = await client.chatGPT({ prompt: 'Hello' });
        assert.deepStrictEqual(res.config.params['prompt'], 'Hello');
    });

    it('should handle all optional params', async function () {
        var res = await client.chatGPT({
            prompt: 'Explain AI',
            params: {
                add_html: true,
                country_code: 'us',
                search: true
            }
        });
        assert.deepStrictEqual(res.config.params['add_html'], true);
        assert.deepStrictEqual(res.config.params['country_code'], 'us');
        assert.deepStrictEqual(res.config.params['search'], true);
    });
});

// ============================================
// YouTube Search API
// ============================================

describe('test_ScrapingBeeClient.youtubeSearch', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.youtubeSearch({
            search: 'web scraping tutorial',
            params: { sort_by: 'relevance', type: 'video' }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['search'], 'web scraping tutorial');
        assert.deepStrictEqual(res.config.params['sort_by'], 'relevance');
    });

    it('should work with only required param', async function () {
        var res = await client.youtubeSearch({ search: 'coding' });
        assert.deepStrictEqual(res.config.params['search'], 'coding');
    });

    it('should handle all optional params', async function () {
        var res = await client.youtubeSearch({
            search: 'music',
            params: {
                '4k': true,
                hd: true,
                duration: '4-20',
                upload_date: 'this_week',
                sort_by: 'view_count',
                type: 'video',
                subtitles: true,
                live: false
            }
        });
        assert.deepStrictEqual(res.config.params['4k'], true);
        assert.deepStrictEqual(res.config.params['hd'], true);
        assert.deepStrictEqual(res.config.params['duration'], '4-20');
        assert.deepStrictEqual(res.config.params['upload_date'], 'this_week');
        assert.deepStrictEqual(res.config.params['subtitles'], true);
    });
});

// ============================================
// YouTube Metadata API
// ============================================

describe('test_ScrapingBeeClient.youtubeMetadata', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.youtubeMetadata({
            video_id: 'dQw4w9WgXcQ'
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['video_id'], 'dQw4w9WgXcQ');
    });
});

// ============================================
// YouTube Transcript API
// ============================================

describe('test_ScrapingBeeClient.youtubeTranscript', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.youtubeTranscript({
            video_id: 'dQw4w9WgXcQ',
            params: { language: 'en' }
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['video_id'], 'dQw4w9WgXcQ');
        assert.deepStrictEqual(res.config.params['language'], 'en');
    });

    it('should work with only required param', async function () {
        var res = await client.youtubeTranscript({ video_id: 'dQw4w9WgXcQ' });
        assert.deepStrictEqual(res.config.params['video_id'], 'dQw4w9WgXcQ');
    });

    it('should handle all optional params', async function () {
        var res = await client.youtubeTranscript({
            video_id: 'dQw4w9WgXcQ',
            params: {
                language: 'es',
                transcript_origin: 'uploader_provided'
            }
        });
        assert.deepStrictEqual(res.config.params['language'], 'es');
        assert.deepStrictEqual(res.config.params['transcript_origin'], 'uploader_provided');
    });
});

// ============================================
// YouTube Trainability API
// ============================================

describe('test_ScrapingBeeClient.youtubeTrainability', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.youtubeTrainability({
            video_id: 'dQw4w9WgXcQ'
        });
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
        assert.deepStrictEqual(res.config.params['video_id'], 'dQw4w9WgXcQ');
    });
});

// ============================================
// Usage API
// ============================================

describe('test_ScrapingBeeClient.usage', function () {
    var api_key = 'API_KEY';
    var client = new ScrapingBeeClient(api_key);
    mock.onGet().reply(200);

    it('should make a request with correct params', async function () {
        var res = await client.usage();
        assert.deepStrictEqual(res.status, 200);
        assert.deepStrictEqual(res.config.params['api_key'], api_key);
    });

    it('should work with empty config', async function () {
        var res = await client.usage({});
        assert.deepStrictEqual(res.status, 200);
    });

    it('should work with optional config', async function () {
        var res = await client.usage({ retries: 3, timeout: 5000 });
        assert.deepStrictEqual(res.status, 200);
    });
});
