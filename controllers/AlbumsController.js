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
			this.error(ctx, 404, 'Not found');
		}
	}

	async findByUser(ctx, next) {
		try {
			const {userId} = ctx.params;
			const {limit, offset} = ctx.query;
			this.success(ctx, await this.albumManager.findByUser(userId, offset, limit));
		} catch (error) {
			this.error(ctx, 404, 'Not found');
		}
	}

	async changeType(ctx, next) {

	}

	async edit(ctx, next) {

	}
}

module.exports = AlbumsController;
