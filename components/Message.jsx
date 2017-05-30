import React, {Component} from 'react';
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.msg = this.msg.bind(this);
  }
  msgStyle() {
    return {
      border: '1px solid black',
      borderRadius: '10px',
      backgroundColor: '#fff1b8'
    }
  }
  msg(){
    var {messages} = this.props;
    return messages.map((msg, key) => {
      return <h5 key={key} style={this.msgStyle()} className="well"><b>{msg.from}</b>: {msg.text}</h5>
    });
  }
  render(){
    return <div>
      {this.msg()}
    </div>
  }
}
