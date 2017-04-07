```
"nodemon": "node --inspect --use_strict ./node_modules/nodemon/bin/nodemon --ignore \".git,node_modules/**/node_modules\" --ext js --exitcrash ./src/init",
```

```bash
$ npm info "eslint-config-airbnb@latest" peerDependencies --json
$ npm install --save-optional eslint-config-airbnb@latest eslint@^3.13.0 eslint-plugin-jsx-a11y@^3.0.2 eslint-plugin-import@^2.2.0 eslint-plugin-react@^6.9.0
```

#### ORM

https://medium.freecodecamp.com/i-analyzed-every-book-ever-mentioned-on-stack-overflow-here-are-the-most-popular-ones-eee0891f1786#.6denka72u

Example (Sequalize.js):
https://github.com/fadliawan/django-express-bench/tree/master/express/exbench-mysql

ORMs vs pg-promise:
https://www.reddit.com/r/node/comments/3wiy6j/what_do_you_think_is_the_best_way_to_use/

Sequalize:
https://www.npmjs.com/package/sequelize

Knex is the way to go:
https://www.npmjs.com/package/knex

https://nodejs.libhunt.com/project/pg-promise/vs/sequelize
https://nodejs.libhunt.com/project/pg-promise/vs/knex

Bookshelf.js is built on Knex ():
- There's not much Postgres specific documentation there because it's an ORM,
the underlying database is just an implementation detail.
- We use Bookshelf and use the Knex instance of it for more complex queries.
http://bookshelfjs.org/
https://blog.ragingflame.co.za/2014/7/21/using-nodejs-with-mysql

----

Probably not the most popular opinion these days,
but when using a SQL database with node,
I don't use an ORM. I just use straight SQL:

```js
pool.query('SELECT * FROM users WHERE id = ?', [ req.params.id ], function (err, result) {
    // ...
});
```

isn't that different than what an ORM call would be:

```js
Users.get(req.params.id, function (err, result) {
    // ...
});
```

#### Header

$ curl -I -k https://wordpress-31043-67215-181802.cloudwaysapps.com
$ curl -I -k http://127.0.0.1:3000

#### Immutable

https://www.youtube.com/watch?v=e-5obm1G_FY

https://github.com/swannodette/mori

https://github.com/facebook/immutable-js/

#### Static site generators notes

https://github.com/sintaxi/harp

https://harpjs.com/recipes/blog-posts-list

https://magician03.github.io/blog/2016/12/20/how-to-host-portfolio-and-blog-using-github-pages-harpjs/

JS hacks:

https://medium.com/@liviu.lupei/12-extremely-useful-hacks-for-javascript-278567de2706

Vanilla React:

https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff

# ./src/app.js

```js
//'use stricter';
// https://github.com/sirisian/ecmascript-use-stricter
// https://github.com/sirisian/ecmascript-types
// https://github.com/dslomov/typed-objects-es7

// Websockets
// https://github.com/koajs/koa.io
// https://github.com/mattstyles/koa-socket
//
// https://github.com/uWebSockets/uWebSockets
// https://github.com/uWebSockets/bindings/tree/master/nodejs
// https://github.com/websockets/ws
// https://socket.io/

// Session
// https://github.com/rkusa/koa-passport/issues/54
// https://github.com/Secbone/koa-session2
// https://github.com/koajs/session
// https://github.com/koajs/generic-session
// https://github.com/TMiguelT/koa-pg-session

// in-memory or server store is good practice:
// http://wonko.com/post/why-you-probably-shouldnt-use-cookies-to-store-session-data
// https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/
// https://github.com/RisingStack/nodehero-authentication

// Koa v2 tutorials:
// https://blog.risingstack.com/web-authentication-methods-explained/
// https://blog.risingstack.com/node-js-security-checklist/
// https://github.com/mapmeld/koa-passport-example
// http://www.zev23.com/2014/03/koajs-tutorial-authenticate-with_7.html
// http://ghost-dozoisch.rhcloud.com/integrating-passportjs-with-koa/

// Redis session store:
// http://stackoverflow.com/questions/10278683/how-safe-it-is-to-store-session-with-redis
// https://www.digitalocean.com/community/tutorials/how-to-set-up-a-redis-server-as-a-session-handler-for-php-on-ubuntu-14-04

// sessions vs. JWT and cookies vs. Local Storage:
// http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
// http://cryto.net/%7Ejoepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/
// https://www.slideshare.net/derekperkins/authentication-cookies-vs-jwts-and-why-youre-doing-it-wrong
// https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
// https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies
// https://auth0.com/learn/json-web-tokens/
// https://jwt.io/
// https://jwt.io/introduction/
// https://www.npmjs.com/package/jws
// https://www.npmjs.com/package/jsonwebtoken
// https://github.com/koajs/jwt/tree/koa-v2

// https://matoski.com/article/jwt-express-node-mongoose/
// https://github.com/auth0-blog/angular-token-auth

// https://github.com/koajs/jwt/blob/koa-v2/test/test.js
// https://github.com/koajs/jwt/blob/koa-v2/test/test-server.js

// One-Time middleware
// https://github.com/expressjs/express/issues/2457
/*let oneTime = null;
const oneTimeQuery = async (ctx, next) => {
  if (oneTime === null) {
    oneTime = await ctx.db.one('SELECT version() as VALUE;', {}, v => v.value);
    debugLog(oneTime);
  }
  await next();
};*/
/*const oneTime = (fn) => {
  try {
    let done = false;
    const res = (ctx, next) => {
      if (done === false) {
        fn(ctx, next);
        done = true;
      }
      next();
    };
    return res;
  } catch (err) {
    debugErr(`oneTime ERROR: ${err.message}` || err);
  }
};
const oneTimeQuery = async (ctx) => {
  //const result = await ctx.db.one('SELECT version() as VALUE;', {}, v => v.value);
  const result = await ctx.db.proc('version', [], a => a.version);
  debugLog(result);
};
app.use(oneTime(oneTimeQuery));*/

// Custom 401 handling
/*app.use(async (ctx, next) => {
  await next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = '401 Unauthorized - Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});*/
```

# ./src/bin/www.js

```js
// pg-promise
// https://github.com/vitaly-t/pg-promise/blob/master/examples/select-insert.md
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#Throw_an_object
/*const db = require('../db/index');
function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}
const query = async (tablename) => {
  await db.task(async (t) => {
    let exist = null;
    try {
      exist = await t.one('SELECT to_regclass($1) AS exist;', tablename, a => !!a.exist);
      if (!exist) {
        debugErr('Database missing');
        throw new UserException(`Table NOT exist: ${exist}`);
      }
      debugLog(`Database exists: ${exist}`);
    } catch (error) {
      debugErr(`PGP ERROR: ${error.message || error}`); // print error;
      process.on('exit', (code) => {
        debugErr(`About to exit with code: ${code}`);
      });
      process.exitCode = 9;
      process.exit();
    }
    return exist;
  });
};
query('foo');
//query('foo2');*/
```
