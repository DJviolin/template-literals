'use strict';

const main = require('./layouts/frontend');

module.exports = state => main(`
  <h1>${state.welcome}</h1>

  <p>Hello world! This is HTML5 Boilerplate.</p>

  <a href="/logout">Logout</a>

  <p>ctx.isAuthenticated(): ${state.login ? true : false}</p>
  <p>Full object: ${JSON.stringify(state, null, 4)}</p>
`,
{ state });
