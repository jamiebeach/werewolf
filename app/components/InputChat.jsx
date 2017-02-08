import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import Send from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';

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
      switch(cmd) {

        case '/vote':
          if (this.props.day) this.props.sendVote(this.props.player.name, target);
          else if (!this.props.day && this.props.player.role === 'werewolf') this.props.sendVote(this.props.player.name, target);
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

    else {
      if (this.props.player.role === 'seer' && !this.props.day) this.props.sendMessage(this.props.player.name, msg, this.props.player.uid);
      else if (this.props.player.role === 'priest' && !this.props.day) this.props.sendMessage(this.props.player.name, msg, this.props.player.uid);
      else if (this.props.player.role === 'werewolf' && !this.props.day) this.props.sendMessage(this.props.player.name, msg, 'werewolves');
      else this.props.sendMessage(this.props.player.name, msg, 'public');
    }

    e.target.message.value = '';
  }


  render() {
    const day = this.props.day;

    return (
      <div id="chat-input">
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={{flexGrow: 1, marginLeft: '10px'}}
            id="message"
            floatingLabelText={(this.props.player.alive) ? "" : "You can't chat when you're dead"}
            floatingLabelStyle={{color: day ? '#000' : '#AAA', fontFamily: 'IM Fell French Canon' }}
            underlineFocusStyle={{borderColor: day ? '#0D7A58' : '#6E0300 ' }}
            inputStyle={{color: day ? '#000' : '#FFF', fontWeight: 'normal', fontFamily: 'IM Fell French Canon' }}
            disabled={(!this.props.player.alive)}
          />
           <IconButton
            type="submit"
            className="enterText"
            disabled={(!this.props.player.alive)}
          >
            <Send
              color={day ? '#000' : '#FFF'}
              hoverColor={day ? '#0D7A58' : '#6E0300'}
            />
          </IconButton>
        </form>
      </div>
    )
  }
}
