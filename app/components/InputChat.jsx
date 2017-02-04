import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {sendMessageAction, sendVoteAction} from '../reducers/game';


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
      //Commands are vote, save, seer:
      let cmd = msg.substring(1,5).toLowerCase();
      let person = msg.substring(5).trim().toLowerCase();

      switch(cmd) {

        case 'vote':
          this.props.sendVote(this.props.user.name, person);
          break;

        case 'save':
          // this.props.saveAction(person);
          break;

        case 'peek':
          if (this.props.game.self.role === 'seer' && !this.props.game.day && this.props.game.peeked === false) {
            this.props.peekAction(person);
          }
          break;

        default:
          break;
      }

    }

    else {this.props.sendMessage(this.props.user.name, msg);}

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

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    game: state.game
  }
};

const mapDispatch = dispatch => {
  return {
    sendMessage: (user, msg) => {
      dispatch(sendMessageAction(user, msg));
    },
    sendVote: (user, victim) => {
      dispatch(sendVoteAction(user, victim));
    }
  }
};

export default connect(mapState, mapDispatch)(Chat);
