import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {joinGame, gameId} from '../reducers/game';


// warning needs some styling, but logic works
export class JoinGame extends React.Component {
	constructor(props) {
		super(props);
		let didStart = false;
		console.log(props)

		firebase.database().ref(`games/${props.gameId}/didStart`).once('value')
    .then(res => {
				console.log(res.val())
        didStart = res.val();
				this.setState({didStart: didStart})
      })
		this.state = {warning: ''};
		console.log(didStart)

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		let userName = '!!!!!';
		if (evt.target.userName) userName = evt.target.userName.value.toLowerCase();
		if (this.props.takenNames.indexOf(userName) !== -1)
			this.setState({warning: 'A player in this game already has that name.'});
		else if (userName === '') this.setState({warning: 'Please provide a name.'})
		else this.props.joinGame(userName, gameId);
	}

	handleKeyDown(evt) {
		if (evt.keyCode === 8) this.setState({warning: ''});
		else if (evt.target.value.length === 12) {
			this.setState({warning: 'Names cannot be longer than 12 characters'});
			if (evt.keyCode !== 8) evt.preventDefault();
		}
	}

	handleKeyPress(evt) {
		if (/[^a-zA-Z0-9]/.test(evt.key)) {
			this.setState({warning: 'Names can only contain letters and numbers'});
			evt.preventDefault();
		}
		else this.setState({warning: ''});
	}

	render() {
		return (
			<div>
				<div className="newGame">
					<div className="formContain">
					<h1 className="formHeader">{(this.state.didStart) ? 'Watch' : 'Join'} A Game</h1>
					{(!this.state.didStart)
					?	<div>
							<h3>If you've already joined this game, refresh this page.</h3>
							<h3>Otherwise, please pick a Player Name.</h3>
						</div>
					: null}

					<form onSubmit={this.handleSubmit} >
						<div>
							{(!this.state.didStart)
							?	<TextField
										name="userName"
										floatingLabelText="Player Name"
										hintStyle={{color: "#AAA"}}
										underlineFocusStyle={{borderColor: "#FFFFFF"}}
										inputStyle={{color: "#FFF", fontWeight: 'normal', fontFamily: 'IM Fell Great Primer SC', textTransform: 'lowercase' }}
										floatingLabelStyle={{color: '#FFF', fontFamily: 'IM Fell Great Primer SC'}}
										onKeyPress={this.handleKeyPress}
										onKeyDown={this.handleKeyDown}
										errorText={this.state.warning}
										/>
							: null}
						</div>
							<RaisedButton type="submit" value="buildGame" label={`${(this.state.didStart) ? 'Watch' : 'Join'} Game`} backgroundColor="#6E0300" className="button" labelStyle={{color: 'white', fontFamily: 'IM Fell English SC'}}/>

					</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    takenNames: state.game.takenNames
  };
};

const mapDispatchToProps = dispatch => {
  return ({
    joinGame (userName, gameId) {
      return dispatch(joinGame(userName, gameId));
    },

  });
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
