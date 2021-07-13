import assert from "assert"
import { process_params } from "../src/utils"

describe('test_process_js_snippet', function() {
    it('should return a base64 buffer', function() {
        var snippet = 'window.scrollTo(0, document.body.scrollHeight);'
        var b64_snippet = Buffer.from(snippet).toString('base64');
        var res = process_params({'js_snippet': snippet});
        assert.strictEqual(res['js_snippet'], b64_snippet);
    })
})

describe('test_process_cookies', function() {
    let expected_result = 'name1=value1;name2=value2';

    it('should return the same string', function() {
        var res = process_params({'cookies': expected_result});
        assert.strictEqual(res['cookies'], expected_result);
    })

    it('should return the stringify object', function() {
        var cookies = {
            'name1': 'value1',
            'name2': 'value2'
        };
        var res = process_params({'cookies': cookies});
        assert.strictEqual(res['cookies'], expected_result);
    })
})

describe('test_process_extract_rules', function() {
    it('should stringify JSON', function() {
        var extract_rules = {'title': '.title'};
        var res = process_params({'extract_rules': extract_rules});
        assert.strictEqual(res['extract_rules'], '%7B%22title%22%3A%22.title%22%7D');
    })
})

describe('test_basic_process_params', function() {
    it('should keep the boolean parameter', function() {
        var bool = true;
        var res = process_params({'render_js': bool});
        assert.strictEqual(res['render_js'], bool);
    });
})