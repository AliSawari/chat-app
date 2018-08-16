import React from 'react'
import {render} from 'react-dom'

import App from './App'

const Main = () => (
  <App/>
)

render(<Main/>, document.getElementsByTagName('body')[0])