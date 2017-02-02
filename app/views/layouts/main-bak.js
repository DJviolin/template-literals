//const mainTop = require('../partials/mainTop');
//const mainBottom = require('../partials/mainBottom');

//const components = require('../components/index');
const htmlHead = require('../components/htmlHead');
const htmlBottom = require('../components/htmlBottom');

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
	${mainBottom.render}
*/

//${htmlHead({ title: foo, description: bar })}
//${htmlHead({ obj: { title: 'title', description: 'description' } })}
//const render = (content, foo, bar) => `
const render = (content, { obj }) => `
	${htmlHead({ obj: { title: 't', description: 'd' } })}

	${content}

	${htmlBottom()}
`;

module.exports = {
	//state,
	render,
};
