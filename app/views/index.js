'use strict';

const main = require('./layouts/frontend');

const loop = (elem) => {
	let results = '';
	for (let i = 0; i < elem; i += 1) {
		results += `<li>Number ${i}</li>\n`;
	}
	console.log(`results length: ${results.length}`);
	return results;
};
//console.log(loop(5));

module.exports = (state, { obj }) => main(`
	<h1>Welcome ${state.welcome}</h1>

	<!-- Add your site or application content here -->
	<p>Hello world! This is HTML5 Boilerplate.</p>

	<p>Numeric addition test: ${state.num} * ${state.num} = ${state.num * state.num}</p>

	<p>Loop test:</p>
	<p>
		https://gist.github.com/wiledal/3c5b63887cc8a010a330b89aacff2f2e<br />
		https://gist.github.com/wiledal<br />
	</p>
	<ul>
		${Array(5).join(0).split(0).map((item, i) => `
			<div>I am item number ${i}.</div>
		`).join('')}
		<br />
		${loop(5)}
	</ul>

	<p>if/else:</p>
	<p>${true === true ? true : false}</p>

	<p>Full object: ${JSON.stringify(state, null, 4)}</p>
`,
{ obj });
