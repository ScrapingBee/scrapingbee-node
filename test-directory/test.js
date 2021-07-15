const fs = require('fs');
const scrapingbee = require('scrapingbee');

async function screenshot(url, path) {
    var client = new scrapingbee.ScrapingBeeClient('ELLIEELLIEELLIE');
    var response = await client.get(url, {
        screenshot: true,
        screenshot_full_page: true,
        window_width: 375,
    });

    fs.writeFileSync(path, response.data);
}

screenshot('https://httpbin-scrapingbee.cleverapps.io/html', './httpbin.png').catch((e) =>
    console.log('A problem occurs : ' + e.message)
);
