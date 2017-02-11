'use strict';

const main = require('./layouts/frontend');
const loop = require('./components/loop');

/*
${Array(5).join(0).split(0).map((item, i) => `
  <div>I am item number ${i}.</div>
`).join('')}
*/

/*const loop = (elem) => {
  let results = '';
  try {
    for (let i = 0; i < elem.length; i += 1) {
      results += `<li>Number ${elem[i]}</li>\n`;
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      results = `
        <span style="color: #f00; font-weight: bold; font-style: italic;">
          Render error:<br />
          ${err}<br />
        </span>
      `;
    } else {
      results = '';
    }
  }
  return results;
};*/

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
    ${loop('<li>Number ', state.array, '</li>')}
  </ul>

  <p>if/else:</p>
  <p>${state.welcome.length === 4 ? true : false}</p>

  <p>Full object: ${JSON.stringify(state, null, 4)}</p>
`,
{ obj });
