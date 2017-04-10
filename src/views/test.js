'use strict';

const main = require('./layouts/frontend');
//const loop = require('./components/loop');

module.exports = state => main(`
  <form action="/auth2" method="POST">
    <input type="hidden" name="_csrf" value="${state.global.csrf}" />
    <p>
      <label>Username:
        <input type="text" name="user[name]" placeholder="Username" value="User2" />
      </label>
    </p>
    <p>
      <label>Password:
        <input type="password" name="user[pass]" placeholder="Password" value="$2a$10$ZKoaHub5foJTU3nA9IXX2ud0Q.RwNdZ20t2bGLLUiOcl1w7TCC3BS" />
      </label>
    </p>
    <p>
      <button type="submit">Log In</button>
    </p>
  </form>
`,
{ state });
