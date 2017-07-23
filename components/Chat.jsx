import React, {Component} from 'react';
import Message from './Message';
import Styles from './Styles';
var socket = io();
// import {RaisedButton, AppBar, FloatingActionButton } from 'material-ui';
function set(a, b) {
  localStorage.setItem(a, b);
}
function get(a) {
  return localStorage.getItem(a);
}

export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: undefined,
      myName: undefined,
      isTyping: {
        typing: false,
        typer: undefined
      },
      messages: [
        {
          from: "Admin",
          text: "Welcome To Chat App"
        }
      ]
    }
    this.message = this.message.bind(this);
    this.typeCheck = this.typeCheck.bind(this);
    this.isTyping = this.isTyping.bind(this);
    this.file = this.file.bind(this);

      socket.on('connect', () => {
        this.setState({ status: 'Connected' });
        socket.emit('in', this.state.myName);
      });
      socket.on('disconnect', () => {
        this.setState({ status: 'Disconnected' });
      });
      socket.on('msg', (msg) => {
        if(msg.image && msg.src) {
          this.setState({
            messages: [
            ...this.state.messages,
            {
              from: msg.from,
              image: true,
              src: msg.src,
              ext: msg.ext
            }
          ]
        });
        } else {
          if(msg.text && (msg.text != undefined) ){
        this.setState({
          messages: [
            ...this.state.messages,
            {
              from: msg.from,
              text: msg.text
            }
          ]
        });
       }
      }
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
      socket.on('isTyping', (name) => {
        this.setState({
          isTyping: {
            typing: true,
            typer: name
          }
        });
        setTimeout(() => {
          this.setState({
            isTyping: {
              typing: false
            }
          });
        },3000);
      });
      socket.on('done', () => {
        socket.emit('newMsg', {
          from: this.state.myName,
          image: true
        });
      });
  }
  componentWillMount(){
    var name = get('name');
    var chatHistory = get('chat-history');
    if (name != undefined) {
      this.setState({ myName: name});
      socket.emit('newUser', name);
    } else {
      var newName = prompt("Your Name : ");
      if (newName != null) {
        set('name', newName);
        this.setState({ myName: newName});
        socket.emit('newUser', newName);
      } else {
        window.location = '/err';
      }
    }
    if (chatHistory) {
      var data = JSON.parse(chatHistory);
      this.setState({
        messages: data
      });
    }
  }
  componentDidUpdate(){
    var {messages} = this.state;
    var strData = JSON.stringify(messages, undefined, 2);
    set('chat-history', strData);
  }

  message(event){
    event.preventDefault();
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

  typeCheck(){
    var {isTyping, myName} = this.state;
    socket.emit('type', myName);
    var text = this.refs.inp.value;
    setTimeout(() => {
      this.setState({
        isTyping: {
          typing: false
        }
      });
    },1000);
  }


isTyping(){
  var {isTyping} = this.state;
  if (isTyping.typing){
    return (
      <h5 style={Styles.typeStyle()}>
      <b>{isTyping.typer}</b> is Typing...
      <i style={{fontSize:'18px'}} className="fa fa-spinner"></i>
      </h5>
    );
  } else {
    return;
  }
}

file(){
  var {myName} = this.state;
  var fileForm = this.refs.fileForm;
  var fileInput = this.refs.fileInput;
  fileInput.click();
  fileInput.onchange = () => {
    fileForm.submit();
  }
}

  render(){
    var {status, messages, isTyping} = this.state;
    return (
      <div style={Styles.jumbStyle()} className='jumbotron'>
        {this.isTyping()}
      <h2>Chat Component</h2>
      <h3 className="well well-lg">Status : <span style={Styles.statusColor(status)}>{status}</span></h3>
      <Message messages={messages}/>
      <div className="row">
        <form onSubmit={this.message}>
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
          <input onKeyUp={this.typeCheck} autoFocus ref="inp" type="text"
            className="form-control" placeholder="message"/>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <button className="btn btn-success">
            <i style={{fontSize:'25px'}} className="fa fa-paper-plane"></i>
            </button>
        </div>
      </form>
        <form encType="multipart/form-data" ref="fileForm" action="/file" method="post">
            <input type="file" name="file" ref="fileInput" style={{display:'none'}}></input>
        </form>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <button onClick={this.file} className="btn btn-success">
            <i style={{fontSize:'25px'}} className="fa fa-picture-o"></i>
        </button>
        </div>
      </div>
      </div>
    );
  }
}
