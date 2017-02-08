'use strict';

// https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/index.js
// 2017-02-08

const Koa = require('koa');

const app = new Koa();

// Generic GET handler
//function GET(url, handler) {
const GET = (url, handler) => {
  app.get(url, (req, res) => {
    handler(req)
      .then((data) => {
        res.json({
          success: true,
          data,
        });
      })
      .catch((error) => {
        res.json({
          success: false,
          error: error.message || error,
        });
      });
  });
};

module.exports = GET;
