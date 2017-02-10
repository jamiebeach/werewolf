import React, {Component} from 'react';
import ChatContainer from './ChatContainer';
import JoinGame from './JoinGame';
import {connect} from 'react-redux';
import {updateGameActions, updatePlayer, joinGame} from '../reducers/game';

export class GameContainer extends Component {
  constructor(props) {
    super(props)
    console.log(props.auth);

  }

  // ComponentDidUpdate (prevProps, prevState){
  //   console.log("changed: ", prevProps, this.props);
  //   if(!prevProps.auth && this.props.auth) {
  //     console.log('****** inside if Statement *********')

  //   }
  // }

  componentDidMount (){
    console.log('mounted!!!!', this.props)
    const rosterPlayer = firebase.database().ref(`games/${this.props.params.id.gameId}/roster/${this.props.auth.uid}`).once('value')
      rosterPlayer.then(res => {
        console.log(res, res.name)
        if(res) {
          console.log('hello??')
          updatePlayer({name: res.name});
          updateGameActions();
        }
      })
  }

  render () {
    return (
      <div>
        {/*console.log('inside gameContainer, player = ', this.props.player)*/}
        {this.props.player.joined ? <ChatContainer /> : <JoinGame />}
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    player: state.game.player,
    games: state.game.games
  };
};

export default connect(mapStateToProps)(GameContainer);


