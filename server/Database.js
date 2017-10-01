'use strict'

const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test');

class Database {
	constructor() {

	}

	enableLogs() {
		mongoose.set('debug', true);
	}
}

module.exports = Database;
