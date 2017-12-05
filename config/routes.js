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
		findByUser: '/album/findByUser',
		changeType: '/album/changeType/:id/:type',
		edit: '/album/edit/:id',
		remove: '/album/remove/:id'
	},
	link: {
		create: '/link/create',
		findById: '/link/findById/:id',
		findByAlbum: '/link/findByAlbum/:albumId',
		remove: '/link/remove/:id'
	}
};