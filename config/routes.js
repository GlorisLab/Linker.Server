'use strict'

module.exports = {
	user: {
		reg: '/user/reg',
		auth: '/user/auth',
		validate: '/user/validate'
	},
	album: {
		create: '/album/create',
		findById: '/album/findById/:id',
		findByUser: '/album/findByUser/:userId',
		changeType: 'album/changeType/:id/:type',
		edit: '/album/edit/:id'
	}
};