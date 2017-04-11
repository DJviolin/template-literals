const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  ctx.body = `
    <form name="attack" enctype="text/plain" action="http://127.0.0.1:3000/auth" method="POST">
      <!--<input type="hidden" name='{"from": "User2", "to": "password2"}'>-->
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
        <button type="submit">Attack!</button>
      </p>
    </form>
    <!--<script>document.attack.submit();</script>-->
  `;
});

//app.listen(3001);
app.listen(3000, '127.0.0.2');
