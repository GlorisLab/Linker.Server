'use strict';

class LinksManager {
	constructor(linkModel, albumModel) {
		this.linkModel = linkModel;
		this.albumModel = albumModel;

		this.create = this.create.bind(this);
		this.findById = this.findById.bind(this);
		this.findByAlbum = this.findByAlbum.bind(this);
		this.getCoverByAlbumId = this.getCoverByAlbumId.bind(this);
		this.remove = this.remove.bind(this);
	}

	create(albumId, url, cover, title, favicon) {
		return this.linkModel.create({ albumId, url, cover, title, favicon });
	}

	findById(id) {
		return this.linkModel.findOne({ _id: id }).exec();
	}

	findByAlbum(userId, albumId, offset = 0, limit = 20) {
		const data = { _id: albumId };

		if (userId) data.userId = userId;

		return this.albumModel
			.findOne(data)
			.exec()
			.then(album => {
				if (album.userId != userId &&
					album.type !== 'public') throw 'Not found';

				console.log('here', album, userId, albumId);

				return this.linkModel
					.find({ albumId })
					.sort( { createdAt: -1 } )
					.skip(parseInt(offset))
					.limit(parseInt(limit))
					.exec();
			});
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