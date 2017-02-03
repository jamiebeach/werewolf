import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


// eventually this has to connect to have access to user, etc
class Chat extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // add your message to the key/value table
    const yourMessage = ["you", e.target.message.value];

    this.props.addMessage(yourMessage);
    e.target.message.value = '';
  }


  render() {
    return (
      <div id="chat-input">
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="message"
            hintText={(this.props.user.alive) ? "Enter message here" : "You can't chat when you're dead"}
            disabled={(!this.props.user.alive)}
            style={{width: "75%"}}
          />
          <RaisedButton
            disabled={(!this.props.user.alive)}
            id="entertext"
            type="submit"
            label="Enter"
            primary={true}
            style={{margin:"10px", float: "right"}}
          />
        </form>
      </div>
    )
  }
}

export default Chat;