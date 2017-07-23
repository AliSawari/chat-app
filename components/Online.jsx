import React, {Component} from 'react';
import Styles from './Styles'
var socket = io();

export default class Online extends Component{
  constructor(props){
    super(props);
    this.people = this.people.bind(this);
    this.state = {
      online_people : []
    }
    socket.on('online', (data) => {
      this.setState({
        online_people: data
      })
    });
  }
  people(){
    var {online_people} = this.state;
      return online_people.map((key, p) => {
        return <h5 style={Styles.p()} key={key}>
          <b>{online_people[p]}</b>
        </h5>
      });
  }
  render(){
    var {online_people} = this.state;
    return (
      <div className="well">
        <h3 style={Styles.p2()}>Online People</h3>
        {this.people()}
      </div>
    );
  }
}
