//const mainTop = require('../partials/mainTop');
const mainBottom = require('../partials/mainBottom');

//const components = require('../components/index');
const htmlHead = require('../components/htmlHead');

//const state = mainTop.state;
//module.exports.state = state;

//mainTop.state = {};
//mainTop.state.title = "Hello, World!";
/*mainTop.state({
	title: "Hello, World!",
});*/
//mainTop.state.title = "Hello, World!";

//const state = {};

//mainTop.state.title = 'test';
/*mainTop.state({
	title: 'test',
});*/

/*
	${htmlHead({ title: foo, description: bar })}
	${components.htmlHeadWrapper(foo, bar)}
	${mainTop.render}
*/

const render = (content, foo, bar) => `
	${htmlHead({ title: foo, description: bar })}

	${content}

	${mainBottom.render}
`;

module.exports = {
	//state,
	render,
};
