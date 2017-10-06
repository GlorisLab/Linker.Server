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
}

module.exports = AlbumsManager;
