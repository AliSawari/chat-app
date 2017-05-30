import React, {Component} from 'react';
import Message from './Message';
var socket = io();
export default class Chat extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: undefined,
      myName: undefined,
      messages: [
        {
          from: "Admin",
          text: "Welcome To Chat App"
        }
      ]
    }
    this.statusColor = this.statusColor.bind(this);
    this.message = this.message.bind(this);
      socket.on('connect', () => {
        this.setState({ status: 'Connected' });
      });
      socket.on('disconnect', () => {
        this.setState({ status: 'Disconnected' });
      });
      socket.on('msg', (msg) => {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              from: msg.from,
              text: msg.text
            }
          ]
        });
      });
      socket.on('wel', (name) => {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              from: "Admin",
              text: `${name} Joined The Chat`
            }
          ]
        });
      });
  }
  componentWillMount(){
    var name = localStorage.getItem('name');
    if (name != undefined) {
      this.setState({ myName: name});
      socket.emit('newUser', name);
    } else {
      var newName = prompt("Your Name : ");
      localStorage.setItem('name', newName);
      this.setState({ myName: newName});
      socket.emit('newUser', newName);
    }
  }
  statusColor(){
    var {status} = this.state;
  return status === 'Connected' ? {color: 'green'} : {color: 'red'}
}
  message(){
    var {myName} = this.state;
    var text = this.refs.inp.value;
    this.refs.inp.value = '';
    if(text.length > 1){
      socket.emit('newMsg' , {
        from: myName,
        text: text
      });
      this.refs.inp.placeholder = 'message';
    }
    else {
      this.refs.inp.placeholder = 'more than 1 character';
    }
  }

  jumbStyle(){
    return {
      border: '2px solid orange',
      boxShadow: '30px 30px 15px gray'
    }
  }

  render(){
    var {status, messages} = this.state;
    return (
      <div style={this.jumbStyle()} className='jumbotron'>
      <h2>Chat Component</h2>
      <h3 className="well well-lg">Status : <span style={this.statusColor()}>{status}</span></h3>
      <Message messages={messages}/>
      <div className="row">
        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
          <input ref="inp" type="text"
            className="form-control" placeholder="message"/>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <button onClick={this.message} className="btn btn-success">Send</button>
        </div>
      </div>
      </div>
    );
  }
}
