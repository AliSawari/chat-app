const express = require('express')
const request = require('supertest')
const app = express();

import homeRouter from './../server/routes/home'
import loginRouter from './../server/routes/login'

app.use('/', homeRouter)
app.use('/login', loginRouter)

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