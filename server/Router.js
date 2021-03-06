'use strict'

const KoaRouter = require('koa-router');

const AlbumsController = require('../controllers/AlbumsController');
const UsersController = require('../controllers/UsersController');
const LinksController = require('../controllers/LinksController');

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
		const albumsController = new AlbumsController(this.managers.albums, this.managers.links);
		const usersController = new UsersController(passport, this.managers.users);
		const linksController = new LinksController(this.managers.links);

		this.authValidator = usersController.validate;
		this.obtainUserIfProvided = usersController.obtainUserIfProvided;

		this.registerMiddlewares();
		this.registerStrategies();
		this.registerUserRoutes(this.routes.user, usersController);
		this.registerAlbumRoutes(this.routes.album, albumsController);
		this.registerLinkRoutes(this.routes.link, linksController);
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
		this.router.get(paths.validate, this.authValidator, controller.printer);
	}

	registerAlbumRoutes(paths, controller) {
		this.router.post(paths.create, this.authValidator, controller.create);
		this.router.get(paths.findById, this.authValidator, controller.findById);
		this.router.get(paths.findByUser, this.authValidator, controller.findByUser);
		this.router.get(paths.changeType, this.authValidator, controller.changeType);
		this.router.post(paths.edit, this.authValidator, controller.edit);
		this.router.get(paths.remove, this.authValidator, controller.remove);
	}

	registerLinkRoutes(paths, controller) {
		this.router.post(paths.create, this.authValidator, controller.create);
		this.router.get(paths.findById, this.authValidator, controller.findById);
		this.router.get(paths.findByAlbum, this.obtainUserIfProvided, controller.findByAlbum);
		this.router.get(paths.remove, this.authValidator, controller.remove);
	}
}

module.exports = Router;