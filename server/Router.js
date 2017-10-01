'use strict'

const jwt = require('jsonwebtoken');
const KoaRouter = require('koa-router');

const logger = require('koa-logger');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');
const jwtStrategy = require('../strategies/JwtStrategy');
const localStrategy = require('../strategies/LocalStrategy');

class Router {
	constructor(app, routes, managers) {
		this.app = app;
		this.managers = managers;
		this.router = new KoaRouter();
	}

	enableLogs() {
		this.app.use(logger());
	}

	route() {
		this.registerMiddlewares();
		this.registerStrategies();
		this.registerUserRoutes();
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

	registerUserRoutes() {
		this.router.post('/user', async(ctx, next) => {
			try {
				ctx.body = await this.managers.users.userModel.create(ctx.request.body);
			}
			catch (err) {
				ctx.status = 400;
				ctx.body = err;
			}
		});

		this.router.post('/login', async(ctx, next) => {
			await passport.authenticate('local', function (err, user) {
				if (!user) {
					ctx.body = "Login failed";
				} else {
					const payload = {
						id: user.id,
						displayName: user.displayName,
						email: user.email
					};

					const token = jwt.sign(payload, 'GoodBoyCowboy');

					ctx.body = {user: user.displayName, token: 'bearer ' + token};
				}
			})(ctx, next);
		});

		this.router.get('/custom', async(ctx, next) => {
			await passport.authenticate('jwt', function (err, user) {
				if (user) {
					ctx.body = "hello " + user.displayName;
				} else {
					ctx.body = "No such user";
					console.log("err", err);
				}
			})(ctx, next);
		});
	}
}

module.exports = Router;