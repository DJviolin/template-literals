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


//value="${state.filters.json(state.global.flash.params) || 'User2'}"

module.exports = state => main(`
  <form action="/auth" method="POST">
    <input type="hidden" name="_csrf" value="${state.global.csrf}" required />
    <div class="form-group">
      <label for="username-input">Username:</label>
      <input type="text" name="username" id="username-input"  placeholder="Username" value="${state.filters.isEmpty(state.global.flash.params) ? 'User2' : `${state.global.flash.params.username}`}" required />
    </div>
    <div class="form-group">
      <label for="password-input">Password:</label>
      <input type="password" name="password" id="password-input" placeholder="Password" value="password2" required />
    </div>
    <div class="form-group">
      <input type="checkbox" name="remember-me" id="remember-me-input" checked>
      <label for="remember-me-input">Remember Me?</label>
    </div>
    <div class="form-group">
      <button type="submit">Log In</button>
    </div>
  </form>
`,
{ state });
