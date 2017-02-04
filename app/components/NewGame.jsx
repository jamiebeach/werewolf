import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

export const Welcome = () => {
	return (
        <div>
          <div className="formContain">
              <h1 className="formHeader">Start a New Game</h1>
              <h2>You are the Game Leader. Please fill out the fields below, you will then be redirected to your game page. 
              You can send the url to your friends and when everyone is ready you can start your game.</h2>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <TextField
                    name="gameName"
                    hintText="Name of Game"
                    floatingLabelText="Name of Game"
                  /><br />
                  <TextField
                    name="userName"
                    hintText="Player Name"
                    floatingLabelText="This name will be displayed to other players"
                    type="password"
                    onChange={this.handleChangePassword}
                  /><br />
                  <RaisedButton type="submit" value="buildGame" label="Start New Game" backgroundColor="#FA8072" className="button" labelStyle={{color: 'white'}}/>
                </div>
              </form>
          </div>
        </div>
      );
    }