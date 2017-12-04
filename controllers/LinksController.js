'use strict';

const BaseController = require('./BaseController');
const ImageProvider = require('../providers/ImageProvider');

class LinksController extends BaseController {
	constructor(linksManager) {
		super();

		this.linksManager = linksManager;
		this.imageProvider = new ImageProvider();

		this.create = this.create.bind(this);
		this.findById = this.findById.bind(this);
		this.findByAlbum = this.findByAlbum.bind(this);
		this.remove = this.remove.bind(this);
		this.mapArrayResponse = this.mapArrayResponse.bind(this);
		this.mapResponse = this.mapResponse.bind(this);
	}

	async create(ctx, next) {
		try {
			const {albumId, url} = ctx.request.body;
			const cover = await this.imageProvider.provide(url);
			const link = await this.linksManager.create(albumId, url, cover);
			this.success(ctx, this.mapResponse(link));
		} catch (error) {
			this.error(ctx, 500, error);
			console.error(error);
		}
	}

	async findById(ctx, next) {
		try {
			const {id} = ctx.params;
			const link = await this.linksManager.findById(id);
			this.success(ctx, this.mapResponse(link));
		} catch (error) {
			this.error(ctx, 404, 'Link not found');
		}
	}

	async findByAlbum(ctx, next) {
		try {
			const {albumId} = ctx.params;
			const {limit, offset} = ctx.query;
			const links = await this.linksManager.findByAlbum(albumId, offset, limit);
			this.success(ctx, {
				count: links.length || 0,
				links: await this.mapArrayResponse(links)
			});
		} catch (error) {
			this.error(ctx, 404, 'Link not found');
		}
	}

	async remove(ctx, next) {
		try {
			const {id} = ctx.params;
			this.success(ctx, {
				success: !!(await this.linksManager.remove(id))
			});
		} catch (error) {
			this.error(ctx, 404, 'Link not found');
		}
	}

	async mapArrayResponse(links) {
		return links.map(link => this.mapResponse(link));
	}

	mapResponse(link) {
		return {
			id: link.id,
			album: link.albumId,
			url: link.url,
			cover: link.cover
		}
	}
}

module.exports = LinksController;
