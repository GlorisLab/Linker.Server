'use strict'

const jwt = require('jsonwebtoken');
const BaseController = require('../controllers/BaseController');

const cryptoConfig = require('../config/crypto');

class UsersController extends BaseController {
	constructor(passport, usersManager) {
		super();

		this.passport = passport;
		this.usersManager = usersManager;

		this.auth = this.auth.bind(this);
		this.validate = this.validate.bind(this);
		this.register = this.register.bind(this);
	}

	async register(ctx, next) {
			try {
				const { displayName, email, password } = ctx.request.body;
				this.success(ctx, await this.usersManager.create(displayName, email, password));
			}
			catch (err) {
				this.error(ctx, 500, err);
			}
	}

	async auth(ctx, next) {
		await this.passport.authenticate('local', (err, user) => {
			if (!user) {
				this.error(ctx, 404, 'User Not Found');
				return;
			}

			const payload = {
				id: user.id,
				displayName: user.displayName,
				email: user.email
			};

			const token = cryptoConfig.formToken(jwt.sign(payload, cryptoConfig.salt));
			ctx.body = {user: user.displayName, token };
		})(ctx, next);
	}

	async validate(ctx, next) {
		await this.passport.authenticate('jwt', (err, user) => {
			if (!user) {
				this.error(ctx, 404, 'User not found');
				return;
			}

			ctx.user = user;
			return next();
		})(ctx, next);
	}

	async printer(ctx, next) {
		ctx.body = ctx.user;
	}
}

module.exports = UsersController;
