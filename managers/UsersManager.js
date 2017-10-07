'use strict'

class UsersManager {
	constructor(userModel) {
		this.albumModel = userModel;
	}

	create(displayName, email, password) {
		return this.albumModel.create({ displayName, email, password });
	}

	findById(id) {
		return this.albumModel.findOne({ _id: id }).exec();
	}

	findByEmail(email) {
		return this.albumModel.findOne({ email }).exec();
	}
}

module.exports = UsersManager;
