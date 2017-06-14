import React, {Component} from 'react';
import About from './About';
import Chat from './Chat';
export default class Main extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="container">
        <isTyping/>
        <h1>Chat Application</h1>
        <Chat/>
        <About/>
      </div>
    );
  }
}
