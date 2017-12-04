'use strict';

const crypto = require('crypto');

module.exports = (mongoose) => {
	const albumSchema = new mongoose.Schema({
		userId: {
			ref: 'Users',
			type: mongoose.Schema.ObjectId
		},
		type: {
			type: String,
			default: 'private'
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		cover: {
			type: String
		}
	}, {
		timestamps: true
	});

	return mongoose.model('Albums', albumSchema);
};
