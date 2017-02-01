const mainTop = require('../partials/mainTop');
const mainBottom = require('../partials/mainBottom');

const state = mainTop.state;
module.exports.state = state;

module.exports.render = (content) => {
	return `
		${mainTop.render}

		${content}

		${mainBottom()}
	`;
}
