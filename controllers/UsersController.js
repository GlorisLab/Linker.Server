'use strict'

const jwt = require('jsonwebtoken');

class UsersController {
	constructor(passport, usersManager) {
		this.passport = passport;
		this.usersManager = usersManager;

		this.auth = this.auth.bind(this);
		this.validate = this.validate.bind(this);
		this.register = this.register.bind(this);
	}

	async register(ctx, next) {
			try {
				const { displayName, email, password } = ctx.request.body;
				ctx.body = await this.usersManager.create(displayName, email, password);
			}
			catch (err) {
				ctx.status = 400;
				ctx.body = err;
			}
	}

	async auth(ctx, next) {
		await this.passport.authenticate('local', (err, user) => {
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
		})(ctx, next)
	}

	async validate(ctx, next) {
		await this.passport.authenticate('jwt', (err, user) => {
			if (user) {
				ctx.body = "hello " + user.displayName;
			} else {
				ctx.body = "No such user";
				console.log("err", err);
			}
		})(ctx, next);
	}
}

module.exports = UsersController;
