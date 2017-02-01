const mainTop = require('../partials/mainTop');
const mainBottom = require('../partials/mainBottom');

module.exports = () => {return `
${mainTop()}

		<!-- Add your site or application content here -->
		<p>Hello world! This is HTML5 Boilerplate.</p>

${mainBottom()}
`}
