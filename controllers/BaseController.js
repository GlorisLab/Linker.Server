"use strict";

class BaseController {
	success(ctx, model) {
		ctx.status = 200;
		ctx.body = model;
	}

	error(ctx, code, message) {
		ctx.status = code;
		ctx.body = { error: { code, message } };
	}
}

module.exports = BaseController;
