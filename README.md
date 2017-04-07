# template-literals

#### Git pre-config

```
$ git config user.email "you@example.com"
$ git config user.name "Your Name"
```

http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

#### RUN

```
run the app on linux:
 > $ DEBUG=app:*,koa-router:*,koa-views:* npm start

run the app on windows:
 > SET DEBUG=app:*,koa:*,koa-router*,koa-views* & npm start
 > SET DEBUG=app:*,koa:* & npm start

Eslint:
 > npm run-script --silent eslint
```

#### Benchmark

```
$ ab -k -n 1000 -c 10 http://127.0.0.1:3000/
$ wrk -c 64 -d 30s http://127.0.0.1:3000/
```
