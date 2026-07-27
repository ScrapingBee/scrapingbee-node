# ScrapingBee Node SDK

[ScrapingBee](https://www.scrapingbee.com/) is a web scraping API that handles headless browsers and rotates proxies for you. The Node SDK makes it easier to interact with ScrapingBee's API.

## Installation

You can install ScrapingBee Node SDK with npm.

```bash
npm install scrapingbee
```

## Usage

The ScrapingBee Node SDK is a wrapper around the [axios](https://axios-http.com/docs/intro) library.

Signup to ScrapingBee to [get your API key](https://app.scrapingbee.com/account/register) and some free credits to get started.

## Table of Contents

- [HTML API](#html-api)
- [Google Search API](#google-search-api)
- [Fast Search API](#fast-search-api)
- [Amazon API](#amazon-api)
- [Walmart API](#walmart-api)
- [YouTube API](#youtube-api)
- [ChatGPT API](#chatgpt-api)
- [Gemini API](#gemini-api)
- [Usage API](#usage-api)

---

## HTML API

The HTML API allows you to scrape any webpage and get the HTML content.

### GET Request

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function get(url) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.htmlApi({
        url: url,
        params: {
            render_js: true,
            extract_rules: { title: 'h1', links: 'a @href' },
            js_scenario: {
                instructions: [
                    { click: '#button' },
                    { wait: 500 },
                    { scroll_y: 1000 },
                ]
            },
        }
    });

    const decoder = new TextDecoder();
    const text = decoder.decode(response.data);
    console.log(text);
}

get('https://example.com');
```

### POST Request

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function post(url) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.htmlApi({
        url: url,
        method: 'POST',
        data: 'username=user&password=pass',
        params: {
            render_js: false,
        },
        headers: {
            'Custom-Header': 'value',
        },
        cookies: {
            session: 'abc123',
        },
    });

    const decoder = new TextDecoder();
    const text = decoder.decode(response.data);
    console.log(text);
}

post('https://httpbin.scrapingbee.com/post');
```

### Screenshot

```javascript
const fs = require('fs');
const { ScrapingBeeClient } = require('scrapingbee');

async function screenshot(url, path) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.htmlApi({
        url: url,
        params: {
            screenshot: true,
            screenshot_full_page: true,
            window_width: 375,
        },
    });

    fs.writeFileSync(path, response.data);
}

screenshot('https://example.com', './screenshot.png');
```

---

## Google Search API

Scrape Google search results in real-time.

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function googleSearch(query) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.googleSearch({
        search: query,
        params: {
            language: 'en',
            country_code: 'us',
            page: 1,
            search_type: 'classic',
            device: 'desktop',
            light_request: true,
            nfpr: false,
            add_html: false,
        }
    });

    console.log(response.data);
}

googleSearch('web scraping tools');
```

---

## Fast Search API

Retrieve a lightweight Google result set optimized for sub-second responses.

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function fastSearch(query) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.fastSearch({
        search: query,
        params: {
            page: 1,
            country_code: 'us',
            language: 'en',
            tag: 'my-request',
        }
    });

    console.log(response.data);
}

fastSearch('web scraping tools');
```

---

## Amazon API

Scrape Amazon search results and product details.

### Amazon Search

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function amazonSearch(query) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.amazonSearch({
        query: query,
        params: {
            domain: 'com',
            language: 'en',
            country: 'us',
            device: 'desktop',
            pages: 1,
            start_page: 1,
            sort_by: 'featured',
            currency: 'USD',
            add_html: false,
            screenshot: false,
        }
    });

    console.log(response.data);
}

amazonSearch('laptop');
```

### Amazon Product

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function amazonProduct(asin) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.amazonProduct({
        query: asin,
        params: {
            domain: 'com',
            language: 'en',
            country: 'us',
            device: 'desktop',
            autoselect_variant: false,
            add_html: false,
            screenshot: false,
        }
    });

    console.log(response.data);
}

amazonProduct('B0D2Q9397Y');
```

### Amazon Pricing

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function amazonPricing(asin) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.amazonPricing({
        asin: asin,
        params: {
            domain: 'com',
            language: 'en',
            zip_code: '10001',
            currency: 'USD',
            device: 'desktop',
            light_request: true,
            add_html: false,
        }
    });

    console.log(response.data);
}

amazonPricing('B0D2Q9397Y');
```

---

## Walmart API

Scrape Walmart search results and product details.

### Walmart Search

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function walmartSearch(query) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.walmartSearch({
        query: query,
        params: {
            device: 'desktop',
            sort_by: 'best_match',
            min_price: 10,
            max_price: 1000,
            delivery_zip: '10001',
            store_id: '',
            fulfillment_speed: '',
            add_html: false,
            screenshot: false,
        }
    });

    console.log(response.data);
}

walmartSearch('laptop');
```

### Walmart Product

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function walmartProduct(productId) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.walmartProduct({
        product_id: productId,
        params: {
            device: 'desktop',
            delivery_zip: '10001',
            store_id: '',
            add_html: false,
            screenshot: false,
        }
    });

    console.log(response.data);
}

walmartProduct('123456789');
```

---

## YouTube API

Scrape YouTube search results, video metadata, and subtitles.

### YouTube Search

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function youtubeSearch(query) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.youtubeSearch({
        search: query,
        params: {
            sort_by: 'relevance',
            type: 'video',
            upload_date: '',
            duration: '',
            hd: false,
            '4k': false,
            subtitles: false,
            live: false,
        }
    });

    console.log(response.data);
}

youtubeSearch('web scraping tutorial');
```

### YouTube Metadata

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function youtubeMetadata(videoId) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.youtubeMetadata({
        video_id: videoId,
    });

    console.log(response.data);
}

youtubeMetadata('dQw4w9WgXcQ');
```

### YouTube Subtitles

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function youtubeSubtitles(videoId) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.youtubeSubtitles({
        video_id: videoId,
        params: {
            language: 'en',
            subtitle_origin: 'auto_generated',
        }
    });

    console.log(response.data);
}

youtubeSubtitles('dQw4w9WgXcQ');
```

---

## ChatGPT API

Use ChatGPT with optional web search capabilities.

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function askChatGPT(prompt) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.chatGPT({
        prompt: prompt,
        params: {
            search: true,
            country_code: 'us',
            add_html: false,
        }
    });

    console.log(response.data);
}

askChatGPT('What are the latest web scraping trends?');
```

---

## Gemini API

Ask Gemini through ScrapingBee and receive citation objects when available.

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function askGemini(prompt) {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.gemini({
        prompt: prompt,
        params: {
            country_code: 'us',
            add_html: false,
        }
    });

    console.log(response.data);
}

askGemini('What are the latest web scraping trends?');
```

---

## Usage API

Check your API credit usage and account limits.

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function checkUsage() {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.usage();

    console.log(response.data);
}

checkUsage();
```

---

## Retries

All API methods support automatic retry for 5XX responses.

```javascript
const { ScrapingBeeClient } = require('scrapingbee');

async function scrapeWithRetry() {
    const client = new ScrapingBeeClient('YOUR-API-KEY');
    const response = await client.htmlApi({
        url: 'https://example.com',
        retries: 5,
        timeout: 30000,
    });

    console.log(response.data);
}
```

---

## Promise and Async/Await

All methods return Promises, so you can use either `.then()` or `async/await`:

```javascript
// Using async/await
const response = await client.googleSearch({ search: 'test' });

// Using .then()
client.googleSearch({ search: 'test' })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```

---

## Legacy Methods (Deprecated)

The `get()` and `post()` methods are deprecated and will be removed in a future version. Please use `htmlApi()` instead.

```javascript
// Deprecated
await client.get({ url: '...' });
await client.post({ url: '...' });

// Use instead
await client.htmlApi({ url: '...', method: 'GET' });
await client.htmlApi({ url: '...', method: 'POST' });
```

---

## Documentation

For more details on all available parameters, visit [ScrapingBee's documentation](https://www.scrapingbee.com/documentation/).