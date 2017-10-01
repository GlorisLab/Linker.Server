'use strict'

const mongoose = require('mongoose');

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

		this.userModel = UserModel(mongoose);
		this.usersManager = new UsersManager(this.userModel);
	}

	getManagers() {
		return {
			users: this.usersManager
		}
	}
}

module.exports = Database;
