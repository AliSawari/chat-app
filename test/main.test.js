const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/../public`))
 
describe('GET /', () => {
  it('should respond with 200', () => {
    request(app)
    .get('/')
    .expect(200)
    .end((err) => {
      if (err) throw err
    });
  });
});