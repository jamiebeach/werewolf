import React from 'react';
import ChatContainer from './ChatContainer';
import JoinGame from './JoinGame';
import {connect} from 'react-redux';

const GameContainer = props => {
  return (
    <div>
      {props.self.joined ? <ChatContainer /> : <JoinGame />}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    self: state.game.self
  };
};

export default connect(mapStateToProps)(GameContainer);


