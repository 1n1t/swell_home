const mongoose = require('mongoose');

const { MONGODB_URI } = require('./keys');

mongoose.Promise = Promise;

const connect = uri =>
	mongoose.connect(uri).catch(error => {
		console.error(
			'There was a problem connecting mongoose to mongodb',
			'Do you have mongodb running?',
			uri
		);
		return Promise.reject(error);
	});

module.exports = async () => {
	connect(MONGODB_URI);

	return function cleanup() {
		mongoose.connection.close();
	};
};
