import React from 'react'
import {render} from 'react-dom'
const rootElement = document.createElement('div')
rootElement.id = 'root'
document.body.appendChild(rootElement)

class Main extends React.Component {
  render(){
    return <h1>Hello This is a login page</h1>
  }
}

render(<Main/>, document.getElementById('root'))
