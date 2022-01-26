import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import { ScrapingBeeClient } from '../src';
import { LIB_VERSION } from '../src/version';

var mock = new MockAdapter(axios);

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
