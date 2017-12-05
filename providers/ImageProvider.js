'use strict';

const ImageResolver = require('image-resolver');

class ImageProvider {
	constructor() {
		this.resolver = new ImageResolver();
		this.resolver.register(new ImageResolver.FileExtension());
		this.resolver.register(new ImageResolver.MimeType());
		this.resolver.register(new ImageResolver.Opengraph());
		this.resolver.register(new ImageResolver.Webpage());
	}

	provide(url) {
		return new Promise((resolve, reject) => {
			this.resolver.resolve(url, result => {
				if (!result) {
					return resolve(null);
				}
				resolve(result.image);
			});
		});
	}
}

module.exports = ImageProvider;
