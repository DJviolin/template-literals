'use strict';

// http://developmentnow.com/2015/02/05/make-your-node-js-api-bulletproof-how-to-test-with-mocha-chai-and-supertest/

const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');

const api = supertest('http://127.0.0.1:3000');

describe('Login', function () {
  it('should return a 200 reponse', function (done) {
    api.get('/login')
      .set('Accept', 'text/html')
      .expect(200, done);
  });
});
