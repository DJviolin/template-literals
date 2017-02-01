const main = require('./layouts/main');

//const state = main.state;
//module.exports.state = state;

module.exports.render = (obj) => {
	return main.render(`
		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

		${JSON.stringify(obj, null, 4)}}
		${obj.title}
	`);
}
