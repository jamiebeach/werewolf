import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {createNewGame} from '../reducers/game';

export const NewGame = props => {

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const userName = evt.target.userName.value;
		const gameName = evt.target.gameName.value;
		props.createNewGame(userName, gameName);
	}

	return (
        <div>
          <div className="newGame">
          	<div className="formContain">
		        <h1 className="formHeader">Start a New Game</h1>
		        <h2>You are the Game Leader.</h2>
		        <h3>Please fill out the fields below, you will then be redirected to your game page.
		        You can send the url to your friends and when everyone is ready you can start your game.</h3>
		        <form onSubmit={handleSubmit} >
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
	                inputStyle={{color: "#FFF", fontWeight: 'normal', fontFamily: 'IM Fell Great Primer SC'}}
	                floatingLabelStyle={{color: '#FFF', fontFamily: 'IM Fell Great Primer SC'}}
  	              />
	              <RaisedButton type="submit" value="buildGame" label="Create New Game" backgroundColor="#6E0300" className="button" labelStyle={{color: 'white', fontFamily: 'IM Fell English SC'}}/>
	            </div>
	         	</form>
	         </div>
          </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
  return ({
    createNewGame (userName, gameName) {
      return dispatch(createNewGame(userName, gameName));
    }
  });
};

export default connect(null, mapDispatchToProps)(NewGame);
