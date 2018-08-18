import * as express from 'express'

const Router: express.Router = express.Router()

Router.get('/', (req, res, next) => {
  res.send("<h1>Hello this is the Login Route</h1>")
});

export default Router