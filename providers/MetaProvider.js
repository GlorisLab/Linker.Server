'use strict'

const https = require('superagent');
const cheerio = require('cheerio');

class MetaProvider {
	constructor() {

	}

	provide(url) {
		return new Promise((resolve, reject) => {
			https.get(url).end((err, res) => {
				if (err) return reject(err);
				const $ = cheerio.load(res.text);
				const title = $('title').text();
				resolve({ title, favicon: `${res.request.protocol}//${res.request.host}/favicon.ico` });
			})
		});
	}
}

module.exports = MetaProvider;