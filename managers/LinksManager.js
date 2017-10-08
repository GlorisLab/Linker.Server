'use strict'

class LinksManager {
	constructor(linkModel) {
		this.linkModel = linkModel;
	}

	create(albumId, url, cover) {
		return this.linkModel.create({ albumId, url, cover });
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
}

module.exports = LinksManager;