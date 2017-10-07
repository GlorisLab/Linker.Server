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

	changeType(id, type) {
		return this.albumModel
			.findOneAndUpdate({ _id: id }, { type }, { new: true })
			.exec();
	}

	edit(id, title, description) {
		return this.albumModel
			.findOneAndUpdate({ _id: id }, { title, description }, { new: true })
			.exec();
	}
}

module.exports = AlbumsManager;
