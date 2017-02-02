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

const state2 = (obj) => {
	//return console.log(JSON.stringify(obj, null, 4));
	return obj;
};
module.exports.state2 = state2;

/*main.state({
	foo: 'baz',
});*/

const state = {};
module.exports.state = state;
/*const state = () => {
	return {};
};
module.exports.state = state;*/

module.exports.render = (obj) => {
	return main.render(`
		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

		${JSON.stringify(state, null, 4)}

		${state.title}

		<p>Numeric addition: ${state.num + 2}</p>

		<p>state2: ${JSON.stringify(state2, null, 4)}</p>
	`);
};
