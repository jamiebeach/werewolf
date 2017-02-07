import React from 'react';
import ChatContainer from './ChatContainer';
import JoinGame from './JoinGame';
import {connect} from 'react-redux';

const GameContainer = props => {
  return (
    <div>
      {props.player.joined ? <ChatContainer /> : <JoinGame />}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    player: state.game.player
  };
};

export default connect(mapStateToProps)(GameContainer);


