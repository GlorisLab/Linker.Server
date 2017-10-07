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
	}

	async create(ctx, next) {
		try {
			const {albumId, url} = ctx.request.body;
			const cover = await this.imageProvider.provide(url);
			this.success(ctx, await this.linksManager.create(albumId, url, cover));
		} catch (error) {
			this.error(ctx, 500, error);
			console.error(error);
		}
	}

	async findById(ctx, next) {
		try {
			const {id} = ctx.params;
			this.success(ctx, await this.linksManager.findById(id));
		} catch (error) {
			this.error(ctx, 404, 'Link not found');
		}
	}

	async findByAlbum(ctx, next) {
		try {
			const {albumId} = ctx.params;
			const {limit, offset} = ctx.query;
			this.success(ctx, await this.linksManager.findByAlbum(albumId, offset, limit));
		} catch (error) {
			this.error(ctx, 404, 'Link not found');
		}
	}
}

module.exports = LinksController;
