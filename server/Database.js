'use strict'

const mongoose = require('mongoose');

const AlbumModel = require('../models/AlbumModel');
const AlbumManager = require('../managers/AlbumsManager');
const UserModel = require('../models/UserModel');
const UsersManager = require('../managers/UsersManager');

mongoose.Promise = Promise;

class Database {
	constructor(connection) {
		this.connection = connection;
	}

	enableLogs() {
		mongoose.set('debug', true);
	}

	connect() {
		mongoose.connect(this.connection.uri, { useMongoClient: true });

		this.albumsModel = AlbumModel(mongoose);
		this.albumsManager = new AlbumManager(this.albumsModel);

		this.usersModel = UserModel(mongoose);
		this.usersManager = new UsersManager(this.usersModel);
	}

	getManagers() {
		return {
			users: this.usersManager,
			albums: this.albumsManager
		}
	}
}

module.exports = Database;
