import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NightImage from './NightImage';
import ChatBox from './ChatBox';
import PlayersList from './PlayersList';
import {sendMessageAction, sendVoteAction, sendSaveAction, sendScryAction, startGame, leaderStart} from '../reducers/game'

const ChatContainer = props => {

  return(
    <div className={props.game.day? 'day' : 'night'}>
      <div className="chatContainer">
        {
          (props.game.day || !props.player.alive || props.player.role !== 'villager')
          ? <ChatBox
            player={props.player}
            messages={props.game.messages}
            players={props.game.users}
            day={props.game.day}
            sendMessage={props.sendMessage}
            sendVote={props.sendVote}
            sendSave={props.sendSave}
            sendScry={props.sendScry}
            startGame={props.startGame}
            leaderStart={props.leaderStart}
            />
          : <NightImage/>
        }
      </div>
      <div className="playerslist">
        <PlayersList
        player={props.player}
        players={props.game.users}
        day={props.game.day}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    game: state.game,
    player: state.game.player
  };
};

const mapDispatchToProps = dispatch => {
  return ({
    sendMessage (user, message, role) {
      return dispatch(sendMessageAction(user, message, role));
    },
    sendVote (user, target) {
      return dispatch(sendVoteAction(user, target));
    },
    sendScry (seerName, targetName) {
      return dispatch(sendScryAction(seerName, targetName));
    },
    sendSave (priestName, targetName) {
      return dispatch(sendSaveAction(priestName, targetName));
    },
    startGame () {
      return dispatch(startGame());
    },
    leaderStart () {
      return dispatch(leaderStart());
    }

  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);


