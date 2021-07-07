const scrapingbee = require('scrapingbee');

var client = new scrapingbee.Client('REPLACE-WITH-YOUR-API-KEY');

client
    .get('https://httpbin-scrapingbee.cleverapps.io/html')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error.response);
    });
