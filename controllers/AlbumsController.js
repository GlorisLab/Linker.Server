'use strict';

const BaseController = require('../controllers/BaseController');

class AlbumsController extends BaseController {
	constructor(albumManager, linkManager) {
		super();

		this.albumManager = albumManager;
		this.linkManager = linkManager;

		this.create = this.create.bind(this);
		this.findById = this.findById.bind(this);
		this.findByUser = this.findByUser.bind(this);
		this.changeType = this.changeType.bind(this);
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.mapArrayResponse = this.mapArrayResponse.bind(this);
		this.mapResponse = this.mapResponse.bind(this);
	}

	async create(ctx, next) {
		try {
			const {userId, title, type, description} = ctx.request.body;
			const album = await this.albumManager.create(userId, title, type, description);

			this.success(ctx, this.mapResponse(album, null));
		} catch (error) {
			this.error(ctx, 500, err);
		}
	}

	async findById(ctx, next) {
		try {
			const {id} = ctx.params;
			const album = await this.albumManager.findById(id);

			this.success(ctx, this.mapResponse(album, null));
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async findByUser(ctx, next) {
		try {
			const {userId} = ctx.params;
			const {limit, offset} = ctx.query;
			const albums = await this.albumManager.findByUser(userId, offset, limit);

			this.success(ctx, { count: albums.length || 0,
				albums: await this.mapArrayResponse(albums) });
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async changeType(ctx, next) {
		try {
			const {id, type} = ctx.params;
			const album = await this.albumManager.changeType(id, type);
			const cover = this.linkManager.getCoverByAlbumId(album.id);

			this.success(ctx, this.mapResponse(album, cover));
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async edit(ctx, next) {
		try {
			const {id} = ctx.params;
			const {title, description} = ctx.request.body;
			const album = await this.albumManager.edit(id, title, description);
			const cover = this.linkManager.getCoverByAlbumId(album.id);

			this.success(ctx, this.mapResponse(album, cover));
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async remove(ctx, next) {
		try {
			const {id} = ctx.params;
			const album = await this.albumManager.remove(id);

			this.success(ctx, {
				success: !!album
			});
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async mapArrayResponse(albums = []) {
		const coverPromises = albums.map(album => this.linkManager.getCoverByAlbumId(album.id));
		const covers = await Promise.all(coverPromises);
		return albums.map((album, i) => this.mapResponse(album, covers[i]));
	}

	mapResponse(album, cover) {
		return {
			id: album.id,
			user: album.userId,
			title: album.title,
			description: album.description,
			type: album.type,
			cover
		}
	}
}

module.exports = AlbumsController;
