# ScrapingBee Node SDK

[ScrapingBee](https://www.scrapingbee.com/) is a web scraping API that handles headless browsers and rotates proxies for you. The Node SDK makes it easier to interact with ScrapingBee's API.

## Installation

You can install ScrapingBee Node SDK with npm.

```bash
npm install scrapingbee
```

## Usage

The ScrapingBee Node SDK is a wrapper around the [axios](https://axios-http.com/docs/intro) library. ScrapingBee supports GET and POST requests.

Signup to ScrapingBee to [get your API key](https://app.scrapingbee.com/account/register) and some free credits to get started.

### Making a GET request

```javascript
const scrapingbee = require('scrapingbee');

async function get(url) {
    var client = new scrapingbee.ScrapingBeeClient('REPLACE-WITH-YOUR-API-KEY');
    var response = await client.get({
        // The URL you want to scrape
        url: url,
        params: {
            // Block ads on the page you want to scrape
            block_ads: false,
            // Block images and CSS on the page you want to scrape
            block_resources: true,
            // Premium proxy geolocation
            country_code: '',
            // Control the device the request will be sent from
            device: 'desktop',
            // Use some data extraction rules
            extract_rules: { title: 'h1' },
            // Wrap response in JSON
            json_response: false,
            // JavaScript scenario to execute (clicking on button, scrolling ...)
            js_scenario: {
                instructions: [
                    { wait_for: '#slow_button' },
                    { click: '#slow_button' },
                    { scroll_x: 1000 },
                    { wait: 1000 },
                    { scroll_x: 1000 },
                    { wait: 1000 },
                ],
            },
            // Use premium proxies to bypass difficult to scrape websites (10-25 credits/request)
            premium_proxy: false,
            // Execute JavaScript code with a Headless Browser (5 credits/request)
            render_js: true,
            // Return the original HTML before the JavaScript rendering
            return_page_source: false,
            // Return page screenshot as a png image
            screenshot: false,
            // Take a full page screenshot without the window limitation
            screenshot_full_page: false,
            // Transparently return the same HTTP code of the page requested.
            transparent_status_code: false,
            // Wait, in miliseconds, before returning the response
            wait: 0,
            // Wait for CSS selector before returning the response, ex ".title"
            wait_for: '',
            // Set the browser window width in pixel
            window_width: 1920,
            // Set the browser window height in pixel
            window_height: 1080,
        },
        headers: {
            // Forward custom headers to the target website
            key: 'value',
        },
        cookies: {
            // Forward custom cookies to the target website
            name: 'value',
        },
        // `timeout` specifies the number of milliseconds before the request times out.
        // If the request takes longer than `timeout`, the request will be aborted.
        timeout: 10000, // here 10sec, default is `0` (no timeout)
    });

    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
}

get('https://httpbin-scrapingbee.cleverapps.io/html').catch((e) => console.log('A problem occurs : ' + e.message));

/* -- output
    <!DOCTYPE html><html lang="en"><head>...
*/
```

ScrapingBee takes various parameters to render JavaScript, execute a custom JavaScript script, use a premium proxy from a specific geolocation and more.

You can find all the supported parameters on [ScrapingBee's documentation](https://www.scrapingbee.com/documentation/).

You can send custom cookies and headers like you would normally do with the requests library.

## Screenshot

Here a little exemple on how to retrieve and store a screenshot from the ScrapingBee blog in its mobile resolution.

```javascript
const fs = require('fs');
const scrapingbee = require('scrapingbee');

async function screenshot(url, path) {
    var client = new scrapingbee.ScrapingBeeClient('REPLACE-WITH-YOUR-API-KEY');
    var response = await client.get({
        url: url,
        params: {
            screenshot: true, // Take a screenshot
            screenshot_full_page: true, // Specify that we need the full height
            window_width: 375, // Specify a mobile width in pixel
        },
    });

    fs.writeFileSync(path, response.data);
}

screenshot('https://httpbin-scrapingbee.cleverapps.io/html', './httpbin.png').catch((e) =>
    console.log('A problem occurs : ' + e.message)
);
```

## Retries

The client includes a retry mechanism for 5XX responses.

```javascript
const spb = require('scrapingbee');

async function get(url) {
    let client = new spb.ScrapingBeeClient('REPLACE-WITH-YOUR-API-KEY');
    let resp = await client.get({ url: url, params: { render_js: false }, retries: 5 });

    let decoder = new TextDecoder();
    let text = decoder.decode(resp.data);
    console.log(text);
}

get('https://httpbin-scrapingbee.cleverapps.io/html').catch((e) => console.log('A problem occured: ' + e.message));
```
