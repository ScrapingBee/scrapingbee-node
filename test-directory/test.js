const fs = require('fs');
const scrapingbee = require('scrapingbee');

var client = new scrapingbee.ScrapingBeeClient('ELLIEELLIEELLIE');

client
    .get('https://httpbin-scrapingbee.cleverapps.io/html', {'screenshot': false})
    .then(function (response) {
        // var data = Buffer.from(response.data);
        // fs.writeFileSync('./test.png', data);
        // var decoder = new TextDecoder('utf-8');
        console.log(Object.keys(response))
        console.log(Object.keys(response))
        // console.log(decoder.decode(response.data))
        // console.log(response.data);
    })
    .catch(function (error) {
        console.log(error.response.status);
        console.log(error.response.data);
    });
