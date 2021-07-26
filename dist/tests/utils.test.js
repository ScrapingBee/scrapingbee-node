"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const utils_1 = require("../src/utils");
describe('test_process_js_snippet', function () {
    it('should return a base64 buffer', function () {
        var snippet = 'window.scrollTo(0, document.body.scrollHeight);';
        var b64_snippet = Buffer.from(snippet).toString('base64');
        var res = utils_1.process_params({ js_snippet: snippet });
        assert_1.default.strictEqual(res['js_snippet'], b64_snippet);
    });
});
describe('test_process_cookies', function () {
    let expected_result = 'name1=value1;name2=value2';
    it('should return the same string', function () {
        var res = utils_1.process_params({ cookies: expected_result });
        assert_1.default.strictEqual(res['cookies'], expected_result);
    });
    it('should return the stringify object', function () {
        var cookies = {
            name1: 'value1',
            name2: 'value2',
        };
        var res = utils_1.process_params({ cookies: cookies });
        assert_1.default.strictEqual(res['cookies'], expected_result);
    });
});
describe('test_process_extract_rules', function () {
    it('should stringify JSON', function () {
        var extract_rules = { title: '.title' };
        var res = utils_1.process_params({ extract_rules: extract_rules });
        assert_1.default.strictEqual(res['extract_rules'], '%7B%22title%22%3A%22.title%22%7D');
    });
});
describe('test_basic_process_params', function () {
    it('should keep the boolean parameter', function () {
        var bool = true;
        var res = utils_1.process_params({ render_js: bool });
        assert_1.default.strictEqual(res['render_js'], bool);
    });
});
describe('test_process_headers', function () {
    it('should contains the user-agent', function () {
        var res = utils_1.process_headers({});
        // Regex -> ScrapingBee-Node/1.0.0
        assert_1.default.match(res['User-Agent'], /^ScrapingBee-Node\/\d+\.\d+\.\d+$/);
    });
    it('should not contains forward_headers', function () {
        var res = utils_1.process_headers({});
        assert_1.default.strictEqual(res['forward_headers'], undefined);
    });
    it('should prefix header and forward_headers', function () {
        var res = utils_1.process_headers({ render_js: true });
        assert_1.default.strictEqual(res['Spb-render_js'], true);
        assert_1.default.strictEqual(res['forward_headers'], true);
    });
});
