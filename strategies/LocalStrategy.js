'use strict'

const LocalStrategy = require('passport-local');

module.exports = (usersManager) => {
	return new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			session: false
		}, (email, password, done) => {
			usersManager
				.findByEmail(email)
				.then(user => {
					if (!user || !user.checkPassword(password)) {
						return done(null, false, {message: 'User not found or password incorrect'});
					}
					return done(null, user);
				})
				.catch(error => done(error));
			});
};
