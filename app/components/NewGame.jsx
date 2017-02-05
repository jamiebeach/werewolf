import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export const NewGame = () => {
	return (
        <div>
          <div className="newGame">
          	<div className="formContain">
		        <h1 className="formHeader">Start a New Game</h1>
		        <h2>You are the Game Leader.</h2>
		        <h3>Please fill out the fields below, you will then be redirected to your game page. 
		        You can send the url to your friends and when everyone is ready you can start your game.</h3>
		        <form >
	            <div>
	              <TextField
	                name="gameName"
	                hintText="Name of Game"
	                floatingLabelText="Name of Game"
	                hintStyle={{color: "#FFF"}}
		            underlineFocusStyle={{borderColor: "#FFFFFF"}}
		            inputStyle={{color: "#FFF", fontWeight: 'normal' }}
		            floatingLabelStyle={{color: '#FFF'}}
	              /><br />
	              <TextField
	                name="userName"
	                hintText="Player Name"
	                floatingLabelText="Player Name"
	                hintStyle={{color: "#AAA"}}
	                underlineFocusStyle={{borderColor: "#FFFFFF"}}
	                inputStyle={{color: "#FFF", fontWeight: 'normal' }}
	                floatingLabelStyle={{color: '#FFF'}}
  	              />
	              <RaisedButton type="submit" value="buildGame" label="Start New Game" backgroundColor="#6E0300" className="button" labelStyle={{color: 'white'}}/>
	            </div>
	         	</form>
	         </div>
          </div>
        </div>
    );
}

export default connect(null)(NewGame);