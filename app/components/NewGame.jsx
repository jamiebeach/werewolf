import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {createNewGame} from '../reducers/game';

/*
----------------- THE NEW GAME COMPONENT -------------
---------(SEE MODAL COMPONENT BELOW NEW GAME CONTAINER)----------
*/

export class NewGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			warning: '',
			newgame: {},
			open: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

  	this.handleOK = this.handleOK.bind(this)
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const userName = evt.target.userName.value;
		const gameName = evt.target.gameName.value;
		if (userName.toLowerCase() === 'moderator') this.setState({warning: 'That name is already taken'})
		else if (userName === '') this.setState({warning: 'Please provide a name.'})
		else this.setState({newgame: {userName, gameName}, open: true});
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

  handleOK() {
    this.setState({open: false});
    this.props.createNewGame(this.state.newgame.userName, this.state.newgame.gameName);
  }

	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.setState({open: false})}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleOK}
      />,
    ];

		return (
			<div>
				<div className="newGame">
					<div className="formContain">
					<h1 className="formHeader">Start a New Game</h1>
					<h2>You are the Game Leader.</h2>
					<h3>Please fill out the fields below, you will then be redirected to your game page.
					You can send the url to your friends and when everyone is ready you can start your game.</h3>
					<form onSubmit={this.handleSubmit} >
						<div>
							<TextField
								name="gameName"
								floatingLabelText="Game Name"
								hintStyle={{color: "#FFF"}}
								underlineFocusStyle={{borderColor: "#FFFFFF"}}
								inputStyle={{color: "#FFF", fontWeight: 'normal', fontFamily: 'IM Fell Great Primer SC'}}
								floatingLabelStyle={{color: '#FFF', fontFamily: 'IM Fell Great Primer SC'}}
							/><br />
							<TextField
								name="userName"
								floatingLabelText="Player Name"
								hintStyle={{color: "#AAA"}}
								underlineFocusStyle={{borderColor: "#FFFFFF"}}
								inputStyle={{color: "#FFF", fontWeight: 'normal', fontFamily: 'IM Fell Great Primer SC', textTransform: 'lowercase' }}
								floatingLabelStyle={{color: '#FFF', fontFamily: 'IM Fell Great Primer SC'}}
								onKeyPress={this.handleKeyPress}
								onKeyDown={this.handleKeyDown}
								/>
                <br/>
              </div>

      					<RaisedButton
      						className="button"
      						type="submit"
      						value="buildGame"
      						label="Create New Game"
      						backgroundColor="#6E0300"
      						labelStyle={{color: 'white', fontFamily: 'IM Fell English SC'}}
      					/>
				        <Dialog
				          title="Confirm Leadership"
				          actions={actions}
				          modal={true}
				          open={this.state.open}
				        >
				          <p>As the leader, you will be responsible for prompting the moderator to assign roles and starting the game when all players are present.</p>

				        </Dialog>

						{(this.state.warning) ? <div>{this.state.warning}</div> : null}
					</form>
					</div>
				</div>
			</div>
		);
	}
}

/* ---------------- CONTAINER ------------------- */

const mapDispatchToProps = dispatch => {
  return ({
    createNewGame (userName, gameName) {
      return dispatch(createNewGame(userName, gameName));
    }
  });
};

export default connect(null, mapDispatchToProps)(NewGame);
