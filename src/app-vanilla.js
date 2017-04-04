'use strict';

const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const json = require('koa-json');
const Koa = require('koa');

const app = new Koa();

app.use(bodyParser());
app.use(helmet()); // https://blog.risingstack.com/node-js-security-checklist/
app.use(json({ pretty: false, param: 'pretty' }));




const jsdom = require('jsdom');
const App = require('./public/js/framework');

const someData = { what: 'eva' };

global.document = jsdom.jsdom();
global.window = document.defaultView;

const appDom = App(someData);

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Know it all</title>
  </head>
  <body>
    ${appDom.outerHTML}
    <script>
      window.SOME_DATA = ${JSON.stringify(someData)};
    </script>
    <script src="app.js"></script>
  </body>
</html>
`;

app.use((ctx) => {
  ctx.body = html;
});




app.listen(8080);
