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

async function testAmazonProduct() {
    console.log('=== Testing Amazon Product API ===');
    try {
        const response = await client.amazonProduct({
            query: 'B0D2Q9397Y', // Example ASIN
            params: {
                domain: 'com'
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

        console.log('Product title:', data.title?.substring(0, 50) || 'N/A');
        console.log('✅ Amazon Product test passed!\n');
    } catch (error) {
        console.log('❌ Amazon Product test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testWalmartSearch() {
    console.log('=== Testing Walmart Search API ===');
    try {
        const response = await client.walmartSearch({
            query: 'laptop',
            params: {
                device: 'desktop',
                sort_by: 'best_match'
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
        console.log('✅ Walmart Search test passed!\n');
    } catch (error) {
        console.log('❌ Walmart Search test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testWalmartProduct() {
    console.log('=== Testing Walmart Product API ===');
    try {
        const response = await client.walmartProduct({
            product_id: '13943258180',
            params: {
                device: 'desktop'
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

        console.log('Product title:', data.title?.substring(0, 50) || 'N/A');
        console.log('✅ Walmart Product test passed!\n');
    } catch (error) {
        console.log('❌ Walmart Product test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testChatGPT() {
    console.log('=== Testing ChatGPT API ===');
    try {
        const response = await client.chatGPT({
            prompt: 'What is web scraping?',
            params: {
                search: true
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

        console.log('Response:', data.results_text?.substring(0, 50) || 'N/A');
        console.log('✅ ChatGPT test passed!\n');
    } catch (error) {
        console.log('❌ ChatGPT test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testYouTubeSearch() {
    console.log('=== Testing YouTube Search API ===');
    try {
        const response = await client.youtubeSearch({
            search: 'web scraping tutorial',
            params: {
                sort_by: 'relevance',
                type: 'video'
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

        console.log('Results found:', data.results?.length || 0);
        console.log('✅ YouTube Search test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Search test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testYouTubeMetadata() {
    console.log('=== Testing YouTube Metadata API ===');
    try {
        const response = await client.youtubeMetadata({
            video_id: 'dQw4w9WgXcQ'
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

        console.log('Number of Likes:', data.like_count || 'N/A');
        console.log('✅ YouTube Metadata test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Metadata test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testYouTubeTranscript() {
    console.log('=== Testing YouTube Transcript API ===');
    try {
        const response = await client.youtubeTranscript({
            video_id: 'q0aFOxT6TNw',
            params: {
                language: 'en'
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

        console.log('Transcript segments:', data.text?.substring(0, 100) || 'N/A');
        console.log('✅ YouTube Transcript test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Transcript test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testYouTubeTrainability() {
    console.log('=== Testing YouTube Trainability API ===');
    try {
        const response = await client.youtubeTrainability({
            video_id: 'dQw4w9WgXcQ'
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

        console.log('Trainability data:', data.permitted || 'N/A');
        console.log('✅ YouTube Trainability test passed!\n');
    } catch (error) {
        console.log('❌ YouTube Trainability test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data?.toString());
        }
    }
}

async function testHtmlApiGet() {
    console.log('=== Testing HTML API - GET ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/get',
            method: 'GET',
            params: {
                render_js: false
            }
        });
        console.log('Status:', response.status);
        console.log('Response:', response.data.toString().substring(0, 200) + '...');
        console.log('✅ HTML API GET test passed!\n');
    } catch (error) {
        console.log('❌ HTML API GET test failed:', error.message);
    }
}

async function testHtmlApiPost() {
    console.log('=== Testing HTML API - POST ===');
    try {
        const response = await client.htmlApi({
            url: 'https://httpbin.org/post',
            method: 'POST',
            params: {
                render_js: false
            },
            data: 'test=data'
        });
        console.log('Status:', response.status);
        console.log('Response:', response.data.toString().substring(0, 200) + '...');
        console.log('✅ HTML API POST test passed!\n');
    } catch (error) {
        console.log('❌ HTML API POST test failed:', error.message);
    }
}

async function testUsage() {
    console.log('=== Testing Usage API ===');
    try {
        const response = await client.usage();
        console.log('Status:', response.status);

        let data;
        if (Buffer.isBuffer(response.data)) {
            data = JSON.parse(response.data.toString());
        } else if (typeof response.data === 'string') {
            data = JSON.parse(response.data);
        } else {
            data = response.data;
        }

        console.log('Max API credits:', data.max_api_credit);
        console.log('Used API credits:', data.used_api_credit);
        console.log('Max concurrency:', data.max_concurrency);
        console.log('✅ Usage test passed!\n');
    } catch (error) {
        console.log('❌ Usage test failed:', error.message);
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
    await testAmazonProduct();
    await testWalmartSearch();
    await testWalmartProduct();
    await testChatGPT();
    await testYouTubeSearch();
    await testYouTubeMetadata();
    await testYouTubeTranscript();
    await testYouTubeTrainability();
    await testHtmlApiGet();
    await testHtmlApiPost();
    await testUsage();

    console.log('🏁 All tests completed!\n');
}

runTests();