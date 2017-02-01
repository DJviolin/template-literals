const main = require('./layouts/main').render;

module.exports = (obj) => {
	return main(`
		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

		${JSON.stringify(obj, null, 4)}}
		${obj.title}
	`);
}
