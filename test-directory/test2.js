const scrapingbee = require('scrapingbee');

async function get(url) {
    var client = new scrapingbee.ScrapingBeeClient('ELLIEELLIEELLIE');
    var response = await client.get(url, {json_response: true});

    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
}

get('https://httpbin-scrapingbee.cleverapps.io/html').catch((e) => console.log('A problem occurs : ' + e.message));
