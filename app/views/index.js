const main = require('./layouts/main');

//const state = main.state;
//module.exports.state = state;

//let state = {};
//module.exports.state = state;

const state = (obj) => {
	console.log(JSON.stringify(obj, null, 4));
	return obj;
};
module.exports.state = state;

console.log(state.foo);

const render = (obj) => {
	return main.render(`
		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

		${JSON.stringify(obj, null, 4)}}
		${obj.title}
	`);
};
module.exports.render = render;
