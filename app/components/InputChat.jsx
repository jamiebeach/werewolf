import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {sendMessageAction} from '../reducers/game';


// eventually this has to connect to have access to user, etc
class Chat extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let msg = e.target.message.value;

    if (msg[0] === '/'){


    }





    this.props.sendMessage(this.props.user.name, msg);

    msg = '';
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

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {

  }
};

const mapDispatch = dispatch => {
  return {
    sendMessage: (user, msg) => {
      console.log(user, msg)
      dispatch(sendMessageAction(user, msg))
    },
  }
};

export default connect(mapState, mapDispatch)(Chat);
