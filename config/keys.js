/* eslint-disable global-require */
switch (process.env.NODE_ENV) {
	case 'test':
		module.exports = require('./env/testing');
		break;
	case 'production':
		module.exports = require('./env/prod');
		break;
	default:
		module.exports = require('./env/dev');
}
