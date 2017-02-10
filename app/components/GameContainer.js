import React, {Component} from 'react';
import ChatContainer from './ChatContainer';
import JoinGame from './JoinGame';
import {connect} from 'react-redux';
import {updateGameActions, updatePlayer} from '../reducers/game';

export class GameContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate (prevProps, prevState){
    if (!prevProps.auth.uid && this.props.auth.uid) {
      const rosterPlayer = firebase.database().ref(`games/${this.props.gameId}/roster/${this.props.auth.uid}`).once('value');
      rosterPlayer.then(res => {
        if (res.val()) {
          this.props.updatePlayer({name: res.val().name});
          this.props.updateGameActions();
        }
      })
    }
  }

  // componentDidMount (){
  //   if (this.props.auth.uid) {
  //     const rosterPlayer = firebase.database().ref(`games/${this.props.gameId}/roster/${this.props.auth.uid}`).once('value');
  //     rosterPlayer.then(res => {
  //       if (res) {
  //         this.props.updatePlayer({name: res.val().name});
  //         this.props.updateGameActions();
  //       }
  //     })
  //   }
  // }

  render () {
    return (
      <div>
        {this.props.player.joined ? <ChatContainer /> : <JoinGame gameId={this.props.gameId}/>}
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    player: state.game.player,
    games: state.game.games,
    gameId: state.game.gameId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGameActions: () => dispatch(updateGameActions()),
    updatePlayer: (update) => dispatch(updatePlayer(update))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);


