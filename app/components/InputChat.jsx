import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from './Button';

import {
  sendMessageAction,
  sendVoteAction,
  sendScryAction,
  sendSaveAction
} from '../reducers/game';


export default class Chat extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let msg = e.target.message.value;

    if (msg[0] === '/'){
      //Commands are vote, save, seer:
      const words = msg.split(' ');
      let cmd = words[0].toLowerCase();
      let target;
      if (words.length > 1) target = words[1].toLowerCase();
      console.log("inside inputchat ", cmd, target);
      switch(cmd) {

        case '/vote':
          this.props.sendVote(this.props.self.name, target);
          break;

        case '/save':
          if (this.props.self.role === 'priest' && !this.props.day) {
            this.props.sendSave(this.props.self, target);
          }
          break;

        case '/scry':
          if (this.props.self.role === 'seer' && !this.props.day) {
            this.props.sendScry(this.props.self, target);
          }
          break;
        case '/roles':
          if (this.props.self.leader) {
            this.props.startGame();
          }
          break;
        case '/ready':
          if (this.props.self.leader) {
            this.props.leaderStart();
          }
          break;

        default:
          break;
      }

    }

    else { console.log(this.props.self, msg, 'public'); this.props.sendMessage(this.props.self.name, msg, 'public');}

    e.target.message.value = '';
  }


  render() {
    const day = this.props.day;

    return (
      <div id="chat-input">
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={{width: "80%", marginLeft: 20}}
            id="message"
            hintText={(this.props.self.alive) ? "Enter message here" : "You can't chat when you're dead"}
            hintStyle={{color: day ? '#000' : '#AAA' }}
            underlineFocusStyle={{borderColor: day ? '#0D7A58' : '#6E0300 ' }}
            inputStyle={{color: day ? '#000' : '#FFF' , fontWeight: 'normal' }}
            disabled={(!this.props.self.alive)}
          />
          <Button disabled={(!this.props.self.alive)}
                  type="submit"
                  className="enterText">
                  Enter
          </Button>
        </form>
      </div>
    )
  }
}

// /* -----------------    CONTAINER     ------------------ */

// const mapState = state => {
//   return {
//     game: state.game
//   }
// };

// const mapDispatch = dispatch => {
//   return {
//     sendMessage: (self, msg, role) => {
//       dispatch(sendMessageAction(self, msg, role));
//     },
//     sendVote: (self, target) => {
//       dispatch(sendVoteAction(self, target));
//     },
//     sendScry: (self, target) => {
//       dispatch(sendScryAction(self, target));
//     },
//     sendSave: (self, target) => {
//       dispatch(sendSaveAction(self, target));
//     }
//   }
// };

// export default connect(mapState, mapDispatch)(Chat);
