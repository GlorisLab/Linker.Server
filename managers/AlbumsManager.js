'use strict';

class AlbumsManager {
	constructor(albumModel) {
		this.albumModel = albumModel;
	}

	create(userId, title, type, description) {
		return this.albumModel.create({ userId, title, type, description });
	}

	findById(id) {
		return this.albumModel.findOne({ _id: id }).exec();
	}

	findByUser(userId, offset = 0, limit = 20) {
		return this.albumModel
			.find({ userId })
			.sort( { createdAt: -1 } )
			.skip(parseInt(offset))
			.limit(parseInt(limit))
			.exec();
	}
}

module.exports = AlbumsManager;
