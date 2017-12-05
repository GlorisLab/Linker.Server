'use strict';

class LinksManager {
	constructor(linkModel) {
		this.linkModel = linkModel;
	}

	create(albumId, url, cover, title, favicon) {
		return this.linkModel.create({ albumId, url, cover, title, favicon });
	}

	findById(id) {
		return this.linkModel.findOne({ _id: id }).exec();
	}

	findByAlbum(albumId, offset = 0, limit = 20) {
		return this.linkModel
			.find({ albumId })
			.sort( { createdAt: -1 } )
			.skip(parseInt(offset))
			.limit(parseInt(limit))
			.exec();
	}

	getCoverByAlbumId(albumId) {
		return this.linkModel
			.findOne({ albumId, cover: { $ne: null } })
			.exec()
			.then(link => !link ? null : link.cover);
	}

	remove(linkId) {
		return this.linkModel
			.findOneAndRemove({ albumId })
			.exec();
	}
}

module.exports = LinksManager;