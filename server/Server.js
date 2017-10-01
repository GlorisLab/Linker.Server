'use strict'

const Koa = require('koa');
const Router = require('./Router');

const logger = require('koa-logger');

class Server {
	constructor() {
		this.app = new Koa();
	}

	attachRouter(routes) {
		this.router = new Router(this.app, routes);
		this.router.route();
		return this;
	}

	enableLogs() {
		this.app.use(logger());
		return this;
	}

	serve(port) {
		this.app.listen(port);
		return this;
	}
}

module.exports = Server;