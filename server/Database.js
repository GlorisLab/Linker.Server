'use strict'

const mongoose = require('mongoose');

const UserModel = require('../models/UserModel');
const UsersManager = require('../managers/UsersManager');
const AlbumModel = require('../models/AlbumModel');
const AlbumManager = require('../managers/AlbumsManager');
const LinkModel = require('../models/LinkModel');
const LinksManager = require('../managers/LinksManager');

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

		this.usersModel = UserModel(mongoose);
		this.usersManager = new UsersManager(this.usersModel);

		this.albumsModel = AlbumModel(mongoose);
		this.albumsManager = new AlbumManager(this.albumsModel);

		this.linksModel = LinkModel(mongoose);
		this.linksManager = new LinksManager(this.linksModel, this.albumsModel);
	}

	getManagers() {
		return {
			users: this.usersManager,
			albums: this.albumsManager,
			links: this.linksManager
		}
	}
}

module.exports = Database;
