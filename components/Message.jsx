import React, {Component} from 'react';
import Styles from './Styles';
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.msg = this.msg.bind(this);
  }
  msg(){
    var {messages} = this.props;
    return messages.map((msg, key) => {
      if(msg.image){
        return <div className="well" key={key} style={Styles.msgStyle()}><b>{msg.from}</b>:
          <img style={Styles.imgStyle()} src={msg.src}/>
        </div>
      } else {
      return <h5 key={key} style={Styles.msgStyle()} className="well"><b>{msg.from}</b>: {msg.text}</h5>
    }
    });
  }
  render(){
    return <div>
      {this.msg()}
    </div>
  }
}
