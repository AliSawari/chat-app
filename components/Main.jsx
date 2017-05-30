import React, {Component} from 'react';
import About from './About';
import Chat from './Chat';
export default class Main extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var {children} = this.props;
    return (
      <div className="container">
        <h1>Chat Application</h1>
        {children}
      </div>
    );
  }
}
