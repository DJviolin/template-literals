const mainTop = require('../partials/mainTop');
const mainBottom = require('../partials/mainBottom');

const components = require('../components/index');

//const state = mainTop.state;
//module.exports.state = state;

//mainTop.state = {};
//mainTop.state.title = "Hello, World!";
/*mainTop.state({
	title: "Hello, World!",
});*/
//mainTop.state.title = "Hello, World!";

const state = {};

mainTop.state.title = 'test';
/*mainTop.state({
	title: 'test',
});*/

const render = (content, foo, bar) => `
	${components.htmlHeadWrapper(foo, bar)}

	${mainTop.render}

	${content}

	${mainBottom.render}
`;

module.exports = {
	state,
	render,
};
