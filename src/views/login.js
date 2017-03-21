'use strict';

const main = require('./layouts/frontend');
//const loop = require('./components/loop');

module.exports = (state, { obj }) => main(`
  <form action="/login" method="post">
    <p>
      <label>Username:
        <input type="text" name="username" value="test" />
      </label>
    </p>
    <p>
      <label>Password:
        <input type="password" name="password" value="test" />
      </label>
    </p>
    <p>
      <button type="submit">Log In</button>
    </p>
    <p>
      <a href="/auth/facebook">Sign in with Facebook</a> <a href="/auth/twitter">Sign in with Twitter</a> <a href="/auth/google">Sign in with Google</a>
    </p>
  </form>
`,
{ obj });
