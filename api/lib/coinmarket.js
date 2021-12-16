/* Example in Node.js ES6 using request-promise */
const rp = require('request-promise');
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        'start': '1',
        'limit': '5000',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': global.conf.coinmarket
    },
    json: true,
    gzip: true
};

 const requestCoinMarket = async () => {
            return rp(requestOptions).then(async response => {
                console.log('API call response:', response);
                return await responce
            }).catch((err) => {
                console.log('API call error:', err.message);
                throw err;
            });
        }

module.exports = {
    requestCoinMarket
}
