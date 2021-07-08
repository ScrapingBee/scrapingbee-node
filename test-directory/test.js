const fs = require('fs');
const scrapingbee = require('scrapingbee');

var client = new scrapingbee.ScrapingBeeClient('REPLACE-WITH-YOUR-API-KEY');

client
    .get('https://httpbin-scrapingbee.cleverapps.io/html', {'screenshot': true})
    .then(function (response) {
        var data = Buffer.from(response.data, 'utf-8');
        fs.writeFileSync('./test.png', data);
        // console.log(typeof response.data);
    })
    .catch(function (error) {
        console.log(error.response.status);
        console.log(error.response.data);
    });
