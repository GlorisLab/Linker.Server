'use strict'

const KoaRouter = require('koa-router');

const UsersController = require('../controllers/UsersController');

const logger = require('koa-logger');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');
const jwtStrategy = require('../strategies/JwtStrategy');
const localStrategy = require('../strategies/LocalStrategy');

class Router {
	constructor(app, routes, managers) {
		this.app = app;
		this.managers = managers;
		this.routes = routes;
		this.router = new KoaRouter();
	}

	enableLogs() {
		this.app.use(logger());
	}

	route() {
		const usersController = new UsersController(passport, this.managers.users);

		this.registerMiddlewares();
		this.registerStrategies();
		this.registerUserRoutes(this.routes.user, usersController);
	}

	registerMiddlewares() {
		this.app.use(bodyParser());
		this.app.use(passport.initialize());
		this.app.use(this.router.routes());
	}

	registerStrategies() {
		passport.use(localStrategy(this.managers.users));
		passport.use(jwtStrategy(this.managers.users));
	}

	registerUserRoutes(paths, controller) {
		this.router.post(paths.reg, controller.register);
		this.router.post(paths.auth, controller.auth);
		this.router.get(paths.validate, controller.validate, controller.printer);
	}
}

module.exports = Router;