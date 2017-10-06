'use strict';

const BaseController = require('../controllers/BaseController');

class AlbumsController extends BaseController {
	constructor(albumManager) {
		super();

		this.albumManager = albumManager;

		this.create = this.create.bind(this);
		this.findById = this.findById.bind(this);
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

	}
}

module.exports = AlbumsController;
