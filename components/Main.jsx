import React, {Component} from 'react';
import Online from './Online';
import Chat from './Chat';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// injectTapEventPlugin();
export default class Main extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="container">
        <h1>Chat Application</h1>
        <Chat/>
        <Online/>
      </div>
    );
  }
}
