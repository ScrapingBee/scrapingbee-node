const { ScrapingBeeClient } = require('./dist/index');

const API_KEY = process.env.SCRAPINGBEE_API_KEY;

const client = new ScrapingBeeClient(API_KEY);

async function testHtmlGet() {
    console.log('=== Testing HTML API - GET ===');
    try {
        const response = await client.get({
            url: 'https://httpbin.org/get',
            params: {
                render_js: false
            }
        });
        console.log('Status:', response.status);
        console.log('Response:', response.data.toString().substring(0, 200) + '...');
        console.log('✅ HTML GET test passed!\n');
    } catch (error) {
        console.log('❌ HTML GET test failed:', error.message);
    }
}

async function testHtmlPost() {
    console.log('=== Testing HTML API - POST ===');
    try {
        const response = await client.post({
            url: 'https://httpbin.org/post',
            params: {
                render_js: false
            },
            data: 'test=data'
        });
        console.log('Status:', response.status);
        console.log('Response:', response.data.toString().substring(0, 200) + '...');
        console.log('✅ HTML POST test passed!\n');
    } catch (error) {
        console.log('❌ HTML POST test failed:', error.message);
    }
}

async function testGoogleSearch() {
    console.log('=== Testing Google Search API ===');
    try {
        const response = await client.googleSearch({
            search: 'scrapingbee',
            params: {
                language: 'en',
                country_code: 'us'
            }
        });
        console.log('Status:', response.status);
        console.log('Response type:', typeof response.data);

        // Parse JSON response
        let data;
        if (Buffer.isBuffer(response.data)) {
            data = JSON.parse(response.data.toString());
        } else if (typeof response.data === 'string') {
            data = JSON.parse(response.data);
        } else {
            data = response.data;
        }

        console.log('Results found:', data.organic_results?.length || 0);
        console.log('✅ Google Search test passed!\n');
    } catch (error) {
        console.log('❌ Google Search test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testAmazonSearch() {
    console.log('=== Testing Amazon Search API ===');
    try {
        const response = await client.amazonSearch({
            query: 'laptop',
            params: {
                domain: 'com',
                pages: 1
            }
        });
        console.log('Status:', response.status);

        let data;
        if (Buffer.isBuffer(response.data)) {
            data = JSON.parse(response.data.toString());
        } else if (typeof response.data === 'string') {
            data = JSON.parse(response.data);
        } else {
            data = response.data;
        }

        console.log('Results found:', data.products?.length || 0);
        console.log('✅ Amazon Search test passed!\n');
    } catch (error) {
        console.log('❌ Amazon Search test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function runTests() {
    console.log('\n🚀 Starting ScrapingBee SDK Tests\n');

    await testHtmlGet();
    await testHtmlPost();
    await testGoogleSearch();
    await testAmazonSearch();

    console.log('🏁 All tests completed!\n');
}

runTests();