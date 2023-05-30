import assert from 'assert';
import { is_empty, process_params, process_headers } from '../src/utils';

describe('test_is_empty', function () {
    it('should return true for null', function () {
        assert.strictEqual(is_empty(null), true);
    });
    it('should return true for undefined', function () {
        assert.strictEqual(is_empty(undefined), true);
    });
    it('should return true for empty string', function () {
        assert.strictEqual(is_empty(''), true);
    });
    it('should return true for empty object', function () {
        assert.strictEqual(is_empty({}), true);
    });
    it('should return false for number', function () {
        assert.strictEqual(is_empty(0), false);
    });
    it('should return false for boolean', function () {
        assert.strictEqual(is_empty(false), false);
    });
});

describe('test_process_js_snippet', function () {
    it('should return a base64 buffer', function () {
        var snippet = 'window.scrollTo(0, document.body.scrollHeight);';
        var b64_snippet = Buffer.from(snippet).toString('base64');
        var res = process_params({ js_snippet: snippet });
        assert.strictEqual(res['js_snippet'], b64_snippet);
    });
});

describe('test_process_cookies', function () {
    let expected_result = 'name1=value1;name2=value2';

    it('should return the same string', function () {
        var res = process_params({ cookies: expected_result });
        assert.strictEqual(res['cookies'], expected_result);
    });

    it('should return the stringify object', function () {
        var cookies = {
            name1: 'value1',
            name2: 'value2',
        };
        var res = process_params({ cookies: cookies });
        assert.strictEqual(res['cookies'], expected_result);
    });
});

describe('test_process_extract_rules', function () {
    it('should return the same string', function () {
        var extract_rules = '{"title":".title"}';
        var res = process_params({ extract_rules: extract_rules });
        assert.strictEqual(res['extract_rules'], '{"title":".title"}');
    });
    it('should stringify JSON', function () {
        var extract_rules = { title: '.title' };
        var res = process_params({ extract_rules: extract_rules });
        assert.strictEqual(res['extract_rules'], '{"title":".title"}');
    });
});

describe('test_process_js_scenario', function () {
    it('should stringify JSON', function () {
        var js_scenario = {
            instructions: [{ click: '#buttonId' }],
        };
        var res = process_params({ js_scenario: js_scenario });
        assert.strictEqual(res['js_scenario'], '{"instructions":[{"click":"#buttonId"}]}');
    });
});

describe('test_basic_process_params', function () {
    it('should keep the boolean parameter', function () {
        var bool = true;
        var res = process_params({ render_js: bool });
        assert.strictEqual(res['render_js'], bool);
    });
});

describe('test_process_headers', function () {
    it('should contains the user-agent', function () {
        var res = process_headers({});
        // Regex -> ScrapingBee-Node/1.0.0
        assert.match(res['User-Agent'], /^ScrapingBee-Node\/\d+\.\d+\.\d+$/);
    });

    it('should not contains forward_headers', function () {
        var res = process_headers({});
        assert.strictEqual(res['forward_headers'], undefined);
    });

    it('should prefix header and forward_headers', function () {
        var res = process_headers({ render_js: true });
        assert.strictEqual(res['Spb-render_js'], true);
        assert.strictEqual(res['forward_headers'], true);
    });
});
