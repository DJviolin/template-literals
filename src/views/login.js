'use strict';

const main = require('./layouts/frontend');
//const loop = require('./components/loop');

module.exports = state => main(`
  <form action="/auth" method="POST">
    <input type="hidden" name="_csrf" value="<%= csrf %>" />
    <p>
      <label>Username:
        <input type="text" name="username" placeholder="Username" value="test" />
      </label>
    </p>
    <p>
      <label>Password:
        <input type="password" name="password" placeholder="Password" value="test" />
      </label>
    </p>
    <p>
      <button type="submit">Log In</button>
    </p>
  </form>
`,
{ state });
