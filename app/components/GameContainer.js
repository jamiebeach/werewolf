import React, {Component} from 'react';
import ChatContainer from './ChatContainer';
import JoinGame from './JoinGame';
import {connect} from 'react-redux';
import {updateGameActions} from '../reducers/game';

export class GameContainer extends Component {
  constructor() {
    super()
  }

  ComponentDidUpdate (prevProps, prevState){
    if(!prevProps.player.uid && this.props.player.uid) {
      console.log('****** inside if Statement *********')
      const rosterPlayer = firebase.database().ref(`games/${gameId}/roster/${this.props.player.uid}`).once('value')
      rosterPlayer.then(res => {
        if(res) updateGameActions();
      })
    }
  }

  render () {
    return (
      <div>
        {console.log('inside gameContainer, player = ', this.props.player)}
        {this.props.player.joined ? <ChatContainer /> : <JoinGame />}
        }
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    player: state.game.player,
    games: state.game.games
  };
};

export default connect(mapStateToProps)(GameContainer);


