const { ScrapingBeeClient } = require('./dist/index');

const API_KEY = process.env.SCRAPINGBEE_API_KEY;
const client = new ScrapingBeeClient(API_KEY);

// Helper function to parse response data
function parseResponse(response) {
    if (Buffer.isBuffer(response.data)) {
        return JSON.parse(response.data.toString());
    } else if (typeof response.data === 'string') {
        return JSON.parse(response.data);
    }
    return response.data;
}

// Helper function to assert
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// ============================================
// Legacy HTML API Tests
// ============================================

async function testHtmlGet() {
    console.log('=== Testing HTML API - GET ===');
    try {
        const response = await client.get({
            url: 'https://httpbin.org/get',
            params: { render_js: false }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data, 'Response data is empty');
        assert(response.data.toString().includes('httpbin'), 'Response does not contain expected content');

        console.log('Status:', response.status);
        console.log('✅ HTML GET test passed!\n');
    } catch (error) {
        console.log('❌ HTML GET test failed:', error.message);
        throw error;
    }
}

async function testHtmlPost() {
    console.log('=== Testing HTML API - POST ===');
    try {
        const response = await client.post({
            url: 'https://httpbin.org/post',
            params: { render_js: false },
            data: 'test=data'
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data, 'Response data is empty');
        assert(response.data.toString().includes('test'), 'Response does not contain posted data');

        console.log('Status:', response.status);
        console.log('✅ HTML POST test passed!\n');
    } catch (error) {
        console.log('❌ HTML POST test failed:', error.message);
        throw error;
    }
}

// ============================================
// New HTML API Tests
// ============================================

async function testHtmlApiGet() {
    console.log('=== Testing HTML API (New) - GET ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/get',
            method: 'GET',
            params: { render_js: false }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data, 'Response data is empty');
        assert(response.data.toString().includes('httpbin'), 'Response does not contain expected content');

        console.log('Status:', response.status);
        console.log('✅ HTML API GET test passed!\n');
    } catch (error) {
        console.log('❌ HTML API GET test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiPost() {
    console.log('=== Testing HTML API (New) - POST ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/post',
            method: 'POST',
            params: { render_js: false },
            data: 'test=data'
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data, 'Response data is empty');
        assert(response.data.toString().includes('test'), 'Response does not contain posted data');

        console.log('Status:', response.status);
        console.log('✅ HTML API POST test passed!\n');
    } catch (error) {
        console.log('❌ HTML API POST test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiExtractRules() {
    console.log('=== Testing HTML API - Extract Rules ===');
    try {
        const response = await client.htmlApi({
            url: 'https://www.scrapingbee.com/blog/',
            params: {
                render_js: false,
                extract_rules: {
                    title: 'h1',
                    posts: {
                        selector: '.container > div > div > div',
                        type: 'list',
                        output: {
                            title: 'h4',
                            link: 'a@href'
                        }
                    }
                }
            }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.title, 'Extracted title is missing');
        assert(Array.isArray(data.posts), 'Extracted posts is not an array');
        assert(data.posts.length > 0, 'No posts extracted');

        console.log('Status:', response.status);
        console.log('Extracted title:', data.title);
        console.log('Extracted posts count:', data.posts.length);
        console.log('✅ HTML API Extract Rules test passed!\n');
    } catch (error) {
        console.log('❌ HTML API Extract Rules test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiJsScenario() {
    console.log('=== Testing HTML API - JS Scenario ===');
    try {
        const response = await client.htmlApi({
            url: 'https://www.scrapingbee.com',
            params: {
                render_js: true,
                js_scenario: {
                    instructions: [
                        { wait: 1000 },
                        { scroll_y: 500 },
                        { wait: 500 }
                    ]
                }
            }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data, 'Response data is empty');

        console.log('Status:', response.status);
        console.log('Content:', response.data.toString().substring(0, 300));
        console.log('✅ HTML API JS Scenario test passed!\n');
    } catch (error) {
        console.log('❌ HTML API JS Scenario test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiScreenshot() {
    console.log('=== Testing HTML API - Screenshot ===');
    try {
        const response = await client.htmlApi({
            url: 'https://www.scrapingbee.com',
            params: {
                render_js: true,
                screenshot: true,
                window_width: 1920,
                window_height: 1080
            }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data, 'Response data is empty');
        assert(response.data.length > 10000, 'Screenshot seems too small');

        // Check PNG signature (first 8 bytes)
        const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
        assert(response.data.slice(0, 8).equals(pngSignature), 'Response is not a valid PNG');

        console.log('Status:', response.status);
        console.log('Screenshot size:', response.data.length, 'bytes');
        console.log('✅ HTML API Screenshot test passed!\n');
    } catch (error) {
        console.log('❌ HTML API Screenshot test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiJsonResponse() {
    console.log('=== Testing HTML API - JSON Response ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/get',
            params: {
                render_js: false,
                json_response: true
            }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.body, 'JSON response missing body field');
        assert(data.xhr, 'JSON response missing xhr field');

        const bodyPreview = typeof data.body === 'string'
            ? data.body.substring(0, 300)
            : JSON.stringify(data.body).substring(0, 300);

        console.log('Status:', response.status);
        console.log('Content:', bodyPreview);
        console.log('✅ HTML API JSON Response test passed!\n');
    } catch (error) {
        console.log('❌ HTML API JSON Response test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiWithHeaders() {
    console.log('=== Testing HTML API - Custom Headers ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/headers',
            params: { render_js: false },
            headers: {
                'X-Custom-Header': 'CustomValue123'
            }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data.toString().includes('CustomValue123'), 'Custom header not forwarded');

        console.log('Status:', response.status);
        console.log('✅ HTML API Custom Headers test passed!\n');
    } catch (error) {
        console.log('❌ HTML API Custom Headers test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiWithCookies() {
    console.log('=== Testing HTML API - Custom Cookies ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/cookies',
            params: { render_js: false },
            cookies: {
                session_id: 'abc123',
                user_token: 'xyz789'
            }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const responseText = response.data.toString();
        assert(responseText.includes('abc123') || responseText.includes('xyz789'), 'Cookies not forwarded');

        console.log('Status:', response.status);
        console.log('✅ HTML API Custom Cookies test passed!\n');
    } catch (error) {
        console.log('❌ HTML API Custom Cookies test failed:', error.message);
        throw error;
    }
}

async function testHtmlApiPostWithHeadersAndCookies() {
    console.log('=== Testing HTML API - POST with Headers + Cookies ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/post',
            method: 'POST',
            params: { render_js: false },
            headers: { 'X-Test-Header': 'TestValue' },
            cookies: { session: 'mysession123' },
            data: JSON.stringify({ action: 'submit' })
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);
        assert(response.data.toString().includes('submit'), 'Posted data not in response');

        console.log('Status:', response.status);
        console.log('✅ HTML API POST with Headers + Cookies test passed!\n');
    } catch (error) {
        console.log('❌ HTML API POST with Headers + Cookies test failed:', error.message);
        throw error;
    }
}

// ============================================
// Google Search API
// ============================================

async function testGoogleSearch() {
    console.log('=== Testing Google Search API ===');
    try {
        const response = await client.googleSearch({
            search: 'scrapingbee',
            params: { language: 'en', country_code: 'us' }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.organic_results, 'Missing organic_results in response');
        assert(Array.isArray(data.organic_results), 'organic_results is not an array');
        assert(data.organic_results.length > 0, 'No organic results found');

        console.log('Status:', response.status);
        console.log('Results found:', data.organic_results.length);
        console.log('✅ Google Search test passed!\n');
    } catch (error) {
        console.log('❌ Google Search test failed:', error.message);
        throw error;
    }
}

// ============================================
// Amazon API
// ============================================

async function testAmazonSearch() {
    console.log('=== Testing Amazon Search API ===');
    try {
        const response = await client.amazonSearch({
            query: 'laptop',
            params: { domain: 'com', pages: 1 }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.products, 'Missing products in response');
        assert(Array.isArray(data.products), 'products is not an array');
        assert(data.products.length > 0, 'No products found');

        console.log('Status:', response.status);
        console.log('Results found:', data.products.length);
        console.log('✅ Amazon Search test passed!\n');
    } catch (error) {
        console.log('❌ Amazon Search test failed:', error.message);
        throw error;
    }
}

async function testAmazonProduct() {
    console.log('=== Testing Amazon Product API ===');
    try {
        const response = await client.amazonProduct({
            query: 'B0D2Q9397Y',
            params: { domain: 'com' }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.title, 'Missing product title in response');

        console.log('Status:', response.status);
        console.log('Product title:', data.title.substring(0, 50));
        console.log('✅ Amazon Product test passed!\n');
    } catch (error) {
        console.log('❌ Amazon Product test failed:', error.message);
        throw error;
    }
}

// ============================================
// Walmart API
// ============================================

async function testWalmartSearch() {
    console.log('=== Testing Walmart Search API ===');
    try {
        const response = await client.walmartSearch({
            query: 'laptop',
            params: { device: 'desktop', sort_by: 'best_match' }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.products, 'Missing products in response');
        assert(Array.isArray(data.products), 'products is not an array');
        assert(data.products.length > 0, 'No products found');

        console.log('Status:', response.status);
        console.log('Results found:', data.products.length);
        console.log('✅ Walmart Search test passed!\n');
    } catch (error) {
        console.log('❌ Walmart Search test failed:', error.message);
        throw error;
    }
}

async function testWalmartProduct() {
    console.log('=== Testing Walmart Product API ===');
    try {
        const response = await client.walmartProduct({
            product_id: '454408250',
            params: { device: 'desktop' }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.title, 'Missing product title in response');

        console.log('Status:', response.status);
        console.log('Product title:', data.title.substring(0, 50));
        console.log('✅ Walmart Product test passed!\n');
    } catch (error) {
        console.log('❌ Walmart Product test failed:', error.message);
        throw error;
    }
}

// ============================================
// ChatGPT API
// ============================================

async function testChatGPT() {
    console.log('=== Testing ChatGPT API ===');
    try {
        const response = await client.chatGPT({
            prompt: 'What is web scraping? Answer in one sentence.',
            params: { search: true }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.results_text || data.results_markdown, 'Missing response text');

        console.log('Status:', response.status);
        console.log('Response:', (data.results_text || data.results_markdown).substring(0, 100));
        console.log('✅ ChatGPT test passed!\n');
    } catch (error) {
        console.log('❌ ChatGPT test failed:', error.message);
        throw error;
    }
}

// ============================================
// YouTube API
// ============================================

async function testYouTubeSearch() {
    console.log('=== Testing YouTube Search API ===');
    try {
        const response = await client.youtubeSearch({
            search: 'web scraping tutorial',
            params: { sort_by: 'relevance', type: 'video' }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.results, 'Missing results in response');
        assert(Array.isArray(data.results), 'results is not an array');
        assert(data.results.length > 0, 'No results found');

        console.log('Status:', response.status);
        console.log('Results found:', data.results.length);
        console.log('✅ YouTube Search test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Search test failed:', error.message);
        throw error;
    }
}

async function testYouTubeMetadata() {
    console.log('=== Testing YouTube Metadata API ===');
    try {
        const response = await client.youtubeMetadata({
            video_id: 'dQw4w9WgXcQ'
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.title || data.like_count !== undefined, 'Missing expected metadata fields');

        console.log('Status:', response.status);
        console.log('Like count:', data.like_count);
        console.log('✅ YouTube Metadata test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Metadata test failed:', error.message);
        throw error;
    }
}

async function testYouTubeTranscript() {
    console.log('=== Testing YouTube Transcript API ===');
    try {
        const response = await client.youtubeTranscript({
            video_id: 'sfyL4BswUeE',
            params: { language: 'en' }
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.text || data.transcript, 'Missing transcript in response');

        console.log('Status:', response.status);
        console.log('Transcript preview:', (data.text || JSON.stringify(data.transcript)).substring(0, 100));
        console.log('✅ YouTube Transcript test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Transcript test failed:', error.message);
        throw error;
    }
}

async function testYouTubeTrainability() {
    console.log('=== Testing YouTube Trainability API ===');
    try {
        const response = await client.youtubeTrainability({
            video_id: 'dQw4w9WgXcQ'
        });

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.permitted !== undefined, 'Missing permitted field in response');

        console.log('Status:', response.status);
        console.log('Permitted:', data.permitted);
        console.log('✅ YouTube Trainability test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Trainability test failed:', error.message);
        throw error;
    }
}

// ============================================
// Usage API
// ============================================

async function testUsage() {
    console.log('=== Testing Usage API ===');
    try {
        const response = await client.usage();

        assert(response.status === 200, `Expected status 200, got ${response.status}`);

        const data = parseResponse(response);
        assert(data.max_api_credit !== undefined, 'Missing max_api_credit');
        assert(data.used_api_credit !== undefined, 'Missing used_api_credit');
        assert(data.max_concurrency !== undefined, 'Missing max_concurrency');

        console.log('Status:', response.status);
        console.log('Max API credits:', data.max_api_credit);
        console.log('Used API credits:', data.used_api_credit);
        console.log('Max concurrency:', data.max_concurrency);
        console.log('✅ Usage test passed!\n');
    } catch (error) {
        console.log('❌ Usage test failed:', error.message);
        throw error;
    }
}

// ============================================
// Run All Tests
// ============================================

async function runTests() {
    console.log('\n🚀 Starting ScrapingBee SDK Tests\n');

    let passed = 0;
    let failed = 0;

    const tests = [
        // Legacy HTML API
        testHtmlGet,
        testHtmlPost,

        // New HTML API
        testHtmlApiGet,
        testHtmlApiPost,
        testHtmlApiExtractRules,
        testHtmlApiJsScenario,
        testHtmlApiScreenshot,
        testHtmlApiJsonResponse,
        testHtmlApiWithHeaders,
        testHtmlApiWithCookies,
        testHtmlApiPostWithHeadersAndCookies,

        // Other APIs
        testGoogleSearch,
        testAmazonSearch,
        testAmazonProduct,
        testWalmartSearch,
        testWalmartProduct,
        testChatGPT,
        testYouTubeSearch,
        testYouTubeMetadata,
        testYouTubeTranscript,
        testYouTubeTrainability,
        testUsage,
    ];

    for (const test of tests) {
        try {
            await test();
            passed++;
        } catch (error) {
            failed++;
        }
    }

    console.log('🏁 All tests completed!');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${tests.length}\n`);

    if (failed > 0) {
        process.exit(1);
    }
}

runTests();
