'use strict';

const main = require('./layouts/frontend');

const loop = (elem) => {
	let results = '';
	for (let i = 0; i < elem; i += 1) {
		results += `<li>Number ${i}</li>\n`;
	}
	return results;
};

const loop2 = (elem) => {
	let i = 0;
	let results = '';
	while (i < elem) {
		results += `<li>Number ${i}</li>\n`;
		i += 1;
	}
	return results;
};

//const array = [2, 4, 6, 8];
/*const loop3 = (elem) => {
	let results = '';
	for (let i = 0; i < elem.length; i += 1) {
		results += `<li>Number ${elem[i]}</li>\n`;
	}
	return results;
};*/

const loop3 = (elem) => {
	let results = '';
	try {
		for (let i = 0; i < elem.length; i += 1) {
			results += `<li>Number ${elem[i]}</li>\n`;
		}
	} catch (err) {
		//results = 'Err!';
		results = `<span style="color: #f00;">Render error: ${err}</span>`;
	}
	return results;
};

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
		<br />
		${loop2(5)}
		<br />
		${loop3(state.array)}
	</ul>

	<p>if/else:</p>
	<p>${state.welcome.length === 4 ? true : false}</p>

	<p>Full object: ${JSON.stringify(state, null, 4)}</p>
`,
{ obj });
