'use strict'

const KoaRouter = require('koa-router');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

class Router {
	constructor(app, routes) {
		this.app = app;
		this.router = new KoaRouter();
	}

	route() {
		this.app.use(bodyParser());
		this.app.use(passport.initialize());
		this.app.use(this.router.routes());
	}
}

module.exports = Router;