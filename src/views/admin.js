'use strict';

const main = require('./layouts/frontend');

/*module.exports = state => main(`
  <h1>${state.welcome}</h1>

  <p>Hello world! This is HTML5 Boilerplate.</p>

  <a href="/logout">Logout</a>
`,
{ state });*/

module.exports = state => main(state.global.isAuthenticated ? `
  <h1>${state.welcome}</h1>

  <p>Hello world! This is HTML5 Boilerplate.</p>

  <a href="/logout">Logout</a>
` : 'ERROR: authentication false',
{ state });
