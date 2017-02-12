# template-literals

```bash
$ npm info "eslint-config-airbnb@latest" peerDependencies --json
$ npm install --save-optional eslint-config-airbnb@latest eslint@^3.13.0 eslint-plugin-jsx-a11y@^3.0.2 eslint-plugin-import@^2.2.0 eslint-plugin-react@^6.9.0
```

#### ORM

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

#### Immutable

https://www.youtube.com/watch?v=e-5obm1G_FY

https://github.com/swannodette/mori

https://github.com/facebook/immutable-js/

#### RUN

```
run the app on linux:
 > $ DEBUG=app:*,koa-router:*,koa-views:* npm start

run the app on windows:
 > SET DEBUG=app:*,koa:*,koa-router*,koa-views* & npm start
 > SET DEBUG=app:*,koa:* & npm start

Flow:
 > npm run-script --silent flow
```

#### Static site generators notes

https://github.com/sintaxi/harp

https://harpjs.com/recipes/blog-posts-list

https://magician03.github.io/blog/2016/12/20/how-to-host-portfolio-and-blog-using-github-pages-harpjs/
