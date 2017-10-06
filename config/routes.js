'use strict'

module.exports = {
	user: {
		reg: '/user/reg',
		auth: '/user/auth',
		validate: '/user/validate'
	},
	album: {
		create: '/album/create',
		findById: '/album/:id',
		findByUser: '/album/:userId',
		changeType: 'album/:id/:type',
		edit: '/album/edit/:id'
	}
};