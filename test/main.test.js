const express = require('express')
const request = require('supertest')
const app = express();

import * as Routes from '../src/server/routes'

app.use('/', Routes.home)
app.use('/login', Routes.login)

describe('GET /', () => {
  it('should respond with 200', () => {
    request(app)
    .get('/')
    .expect(200)
    .end(err => {
      if (err) throw err
    });
  });
});