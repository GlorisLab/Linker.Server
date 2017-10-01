'use strict'

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'GoodBoyCowboy'
};

module.exports = (usersManager) => {
	return new JwtStrategy(jwtOptions, (payload, done) => {
		console.log(payload, done);
		usersManager
			.findById(payload.id)
			.then(user => done(null, user))
			.catch(error => done(error))
		})
	};
