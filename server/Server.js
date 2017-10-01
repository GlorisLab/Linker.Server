'use strict'

const Koa = require('koa');
const Router = require('./Router');
const Database = require('./Database');

class Server {
	constructor() {
		this.app = new Koa();
	}

	attachRouter(routes) {
		this.router = new Router(this.app, routes,
			this.database.getManagers());
		this.router.route();
		return this;
	}

	attachDatabase(connection) {
		this.database = new Database(connection);
		this.database.connect();
		return this;
	}

	enableLogs() {
		this.router.enableLogs();
		this.database.enableLogs();
		return this;
	}

	serve(port) {
		this.app.listen(port);
		return this;
	}
}

module.exports = Server;