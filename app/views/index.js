const main = require('./layouts/main');

//const state = main.state;
//module.exports.state = state;

//let state = {};
//module.exports.state = state;

/*const state = (obj) => {
	console.log(JSON.stringify(obj, null, 4));
	return obj;
}*/

/*module.exports.state2 = (obj) => {
	return console.log(JSON.stringify(obj, null, 4));
};*/

/*const state = {};

const render = () => {
	return main.render(`
		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

		${JSON.stringify(state, null, 4)}

		${state.title}

		<p>Numeric addition: ${state.num + 2}</p>
	`);
};*/

const state = {};

const test = require('./components/test');
const test2 = require('./components/index');

const render = () => main.render(`
		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

		${JSON.stringify(state, null, 4)}

		${state.title}

		<p>Numeric addition: ${state.num + 2}</p>

		${test.addition({ num1: 2, num2: 3 })}
		${test2.addition2(state.num1, state.num2)}
	`,
	'foo',
	'bar');

module.exports = {
	state,
	render,
};
