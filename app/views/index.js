const main = require('./layouts/main');

//const state = main.state;
//module.exports.state = state;

//let state = {};
//module.exports.state = state;

/*const state = (obj) => {
	console.log(JSON.stringify(obj, null, 4));
	return obj;
}*/

const state = {};
module.exports.state = state;

module.exports.render = (obj) => {
	return main.render(`
		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

		${JSON.stringify(state, null, 4)}}

		${state.title}

		<p>Numeric addition: ${state.num + 2}</p>
	`);
};
