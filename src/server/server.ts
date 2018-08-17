import * as express from 'express'
import * as bp from 'body-parser'
import * as http from 'http'

import * as Routes from './routes'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

app.use('/', Routes.home)
app.use('/login', Routes.login)

server.listen(port, (err) => {
  if(err) return console.log(err)
  console.log(`Server is up and running on port ${port}`)
})