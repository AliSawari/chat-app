import * as express from 'express'
import * as bp from 'body-parser'
import * as http from 'http'

import homeRouter from './routes/home'
import loginRouter from './routes/login'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

app.use('/', homeRouter)
app.use('/login', loginRouter)

server.listen(port, (err) => {
  if(err) return console.log(err)
  console.log(`Server is up and running on port ${port}`)
})