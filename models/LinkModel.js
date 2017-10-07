'use strict'

const crypto = require('crypto');

module.exports = (mongoose) => {
	const linkSchema = new mongoose.Schema({
		albumId: {
			ref: 'Albums',
			type: mongoose.Schema.ObjectId
		},
		url: {
			type: String,
			required: true
		},
		cover: {
			type: String
		}
	}, {
		timestamps: true
	});

	return mongoose.model('Links', linkSchema);
};
