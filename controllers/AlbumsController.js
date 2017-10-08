'use strict';

const BaseController = require('../controllers/BaseController');

class AlbumsController extends BaseController {
	constructor(albumManager) {
		super();

		this.albumManager = albumManager;

		this.create = this.create.bind(this);
		this.findById = this.findById.bind(this);
		this.findByUser = this.findByUser.bind(this);
		this.changeType = this.changeType.bind(this);
		this.edit = this.edit.bind(this);
	}

	async create(ctx, next) {
		try {
			const {userId, title, type, description} = ctx.request.body;
			this.success(ctx, await this.albumManager.create(userId, title, type, description));
		} catch (error) {
			this.error(ctx, 500, err);
		}
	}

	async findById(ctx, next) {
		try {
			const {id} = ctx.params;
			this.success(ctx, await this.albumManager.findById(id));
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async findByUser(ctx, next) {
		try {
			const {userId} = ctx.params;
			const {limit, offset} = ctx.query;
			this.success(ctx, await this.albumManager.findByUser(userId, offset, limit));
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async changeType(ctx, next) {
		try {
			const {id, type} = ctx.params;
			this.success(ctx, await this.albumManager.changeType(id, type));
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}

	async edit(ctx, next) {
		try {
			const {id} = ctx.params;
			const {title, description} = ctx.request.body;
			this.success(ctx, await this.albumManager.edit(id, title, description));
		} catch (error) {
			this.error(ctx, 404, 'Album not found');
		}
	}
}

module.exports = AlbumsController;
