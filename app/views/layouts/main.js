const mainTop = require('../partials/mainTop');
const mainBottom = require('../partials/mainBottom');

module.exports.render = (content) => {
	return `
		${mainTop.render}

		${content}

		${mainBottom()}
	`;
}
