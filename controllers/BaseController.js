'use strict'

class BaseController {
	success(ctx, model) {
		ctx.body = model;
	}
}

module.exports = BaseController;
