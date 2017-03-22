'use strict';

const main = require('./layouts/frontend');

module.exports = (state, { obj }) => main(`
  <h1>${state.welcome}</h1>

  <p>Hello world! This is HTML5 Boilerplate.</p>

  <p>${state.login ? 'login is true' : 'login is false'}</p>

  <a href="/logout">Logout</a>
`,
{ obj });
