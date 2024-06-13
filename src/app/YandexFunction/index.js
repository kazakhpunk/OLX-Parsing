const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchPublications() {
    try {
        const response = await fetch('https://www.olx.kz/list/');
        const body = await response.text();
        const $ = cheerio.load(body);

        const listings = [];
        $('div.css-1sw7q4x').each((index, element) => {
            const title = $(element).find('div.css-u2ayx9 a h6.css-16v5mdi').text().trim();
            const price = $(element).find('p.css-tyi9js.er34gjf0').text().trim();
            listings.push({ title, price });
        });

        return listings;
    } catch (error) {
        console.error('Error fetching listings:', error);
        return [];
    }
}

module.exports.handler = async (event, context) => {
    const listings = await fetchPublications();
    return {
        statusCode: 200,
        body: JSON.stringify(listings),
    };
};
