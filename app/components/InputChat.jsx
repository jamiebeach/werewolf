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
          this.props.sendVote(this.props.player.name, target);
          break;

        case '/save':
          if (this.props.player.role === 'priest' && !this.props.day) {
            this.props.sendSave(this.props.player, target);
          }
          break;

        case '/scry':
          if (this.props.player.role === 'seer' && !this.props.day) {
            this.props.sendScry(this.props.player, target);
          }
          break;
        case '/roles':
          if (this.props.player.leader) {
            this.props.startGame();
          }
          break;
        case '/ready':
          if (this.props.player.leader) {
            this.props.leaderStart();
          }
          break;

        default:
          break;
      }

    }

    else { console.log(this.props.player, msg, 'public'); this.props.sendMessage(this.props.player.name, msg, 'public');}

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
            hintText={(this.props.player.alive) ? "Enter message here" : "You can't chat when you're dead"}
            hintStyle={{color: day ? '#000' : '#AAA' }}
            underlineFocusStyle={{borderColor: day ? '#0D7A58' : '#6E0300 ' }}
            inputStyle={{color: day ? '#000' : '#FFF' , fontWeight: 'normal' }}
            disabled={(!this.props.player.alive)}
          />
          <Button disabled={(!this.props.player.alive)}
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
//     sendMessage: (player, msg, role) => {
//       dispatch(sendMessageAction(player, msg, role));
//     },
//     sendVote: (player, target) => {
//       dispatch(sendVoteAction(player, target));
//     },
//     sendScry: (player, target) => {
//       dispatch(sendScryAction(player, target));
//     },
//     sendSave: (player, target) => {
//       dispatch(sendSaveAction(player, target));
//     }
//   }
// };

// export default connect(mapState, mapDispatch)(Chat);
