"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const assert_1 = __importDefault(require("assert"));
const src_1 = require("../src");
var mock = new axios_mock_adapter_1.default(axios_1.default);
describe('test_ScrapingBeeClient.get', function () {
    var api_key = 'API_KEY';
    var target_url = 'https://httpbin-scrapingbee.cleverapps.io/html';
    var client = new src_1.ScrapingBeeClient(api_key);
    mock.onGet().reply(200);
    it('should make a simple GET request with correct query params', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var res = yield client.get(target_url);
            assert_1.default.deepStrictEqual(res.status, 200);
            assert_1.default.deepStrictEqual(res.config.params['api_key'], api_key);
            assert_1.default.deepStrictEqual(res.config.params['url'], target_url);
            assert_1.default.match(res.config.headers['User-Agent'], /^ScrapingBee-Node\//);
        });
    });
    it('should add the render_js query param', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var res = yield client.get(target_url, { render_js: true });
            assert_1.default.deepStrictEqual(res.config.params['render_js'], true);
        });
    });
    it('should prefix header names with Spb- and set forward_headers', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var res = yield client.get(target_url, {}, { 'Content-Type': 'text/html; charset=utf-8' });
            assert_1.default.deepStrictEqual(res.config.headers['Spb-Content-Type'], 'text/html; charset=utf-8');
            assert_1.default.deepStrictEqual(res.config.headers['forward_headers'], true);
        });
    });
    it('should format the cookies and add them to the query params', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var cookies = { name1: 'value1', name2: 'value2' };
            var res = yield client.get(target_url, {}, {}, cookies);
            assert_1.default.deepStrictEqual(res.config.params['cookies'], 'name1=value1;name2=value2');
        });
    });
    it('should format the extract_rules and add them to the query params', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var res = yield client.get(target_url, {
                extract_rules: {
                    title: 'h1',
                    ubtitle: '#subtitle',
                },
            });
            assert_1.default.deepStrictEqual(res.config.params['extract_rules'], '%7B%22title%22%3A%22h1%22%2C%22ubtitle%22%3A%22%23subtitle%22%7D');
        });
    });
});
describe('test_ScrapingBeeClient.post', function () {
    var api_key = 'API_KEY';
    var target_url = 'https://httpbin-scrapingbee.cleverapps.io/post';
    var client = new src_1.ScrapingBeeClient(api_key);
    mock.onPost().reply(201);
    it('should make a simple GET request with correct query params', function () {
        return __awaiter(this, void 0, void 0, function* () {
            var res = yield client.post(target_url);
            assert_1.default.deepStrictEqual(res.status, 201);
            assert_1.default.deepStrictEqual(res.config.params['api_key'], api_key);
            assert_1.default.deepStrictEqual(res.config.params['url'], target_url);
            assert_1.default.match(res.config.headers['User-Agent'], /^ScrapingBee-Node\//);
        });
    });
});
