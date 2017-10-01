'use strict'

class UsersManager {
	constructor(userModel) {
		this.userModel = userModel;
	}

	findById(id) {
		return this.userModel.findOne({ _id: id }).exec();
	}

	findByEmail(email) {
		return this.userModel.findOne({ email }).exec();
	}
}

module.exports = UsersManager;
