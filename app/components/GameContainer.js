import React from 'react';
import ChatContainer from './ChatContainer';
import JoinGame from './JoinGame';
import {connect} from 'react-redux';

export class GameContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    window.onbeforeunload = () => {
      return 'You may forfeit any current games if you leave.';
      // this makes the browser ask you if you really want to leave or reload the page
      //no custom message is possible....
    }
  }

  render() {
    return (
      <div>
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


