import React from 'react'
import {render} from 'react-dom'
const rootElement = document.createElement('div')
rootElement.id = 'root'
document.body.appendChild(rootElement)


import App from './App'

const Main = () => (
  <App/>
)

render(<Main/>, document.getElementById('root'))
