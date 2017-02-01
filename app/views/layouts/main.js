const mainTop = require('../partials/mainTop');
const mainBottom = require('../partials/mainBottom');

//const state = mainTop.state;
//module.exports.state = state;

//mainTop.state = {};
//mainTop.state.title = "Hello, World!";
/*mainTop.state({
	title: "Hello, World!",
});*/
mainTop.state.title = "Hello, World!";

module.exports.render = (content) => {
	return `
		${mainTop.render}

		${content}

		${mainBottom()}
	`;
}
