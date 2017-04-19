'use strict';

const main = require('./layouts/frontend');
//const loop = require('./components/loop');

/*module.exports = state => main(`
  <form action="/auth" method="POST">
    <input type="hidden" name="_csrf" value="${state.global.csrf}" />
    <p>
      <label>Username:
        <input type="text" name="user[name]" placeholder="Username" value="User2" />
      </label>
    </p>
    <p>
      <label>Password:
        <input type="password" name="user[pass]" placeholder="Password" value="password2" />
      </label>
    </p>
    <p>
      <button type="submit">Log In</button>
    </p>
  </form>
`,
{ state });*/

module.exports = state => main(`
  <form action="/auth" method="POST">
    <input type="hidden" name="_csrf" value="${state.global.csrf}" />
    <div class="form-group">
      <label>Username:
        <input type="text" name="username" placeholder="Username" value="User2" required />
      </label>
    </div>
    <div class="form-group">
      <label>Password:
        <input type="password" name="password" placeholder="Password" value="password2" required />
      </label>
    </div>
    <div class="form-group">
      <label for="remember-me-input">
        <input type="checkbox" name="remember-me" id="remember-me-input" checked>
        Remember Me?
      </label>
    </div>
    <p>
      <button type="submit">Log In</button>
    </p>
  </form>
`,
{ state });
