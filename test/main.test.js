const request = require('supertest')
const {app} = require('./../server/server')

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

describe('GET /login', () => {
  it('should respond with 200', () => {
    request(app)
    .get('/login')
    .expect(200)
    .end(err => {
      if (err) throw err
      process.exit(0)
    });
  });
});