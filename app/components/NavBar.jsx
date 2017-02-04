import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

/* -----------------    COMPONENT     ------------------ */

const Navbar = () => {

  return (
    <AppBar
      className='navbar'
      title='Werewolf'
      iconElementLeft={
        // <img src='/home.png' />
        <IconButton
          onClick={() => browserHistory.push('/home')}
          className='icons'>
          <ActionHome
            className='icons'
            color={'#FFFFFF'}
            hoverColor={'#FEDFD1'}
          />
        </IconButton>}

      iconElementRight={
        <div className="navbar-btns">
         <Button
           label="Start A Game"
           labelStyle={{color:'white'}}
           containerElement={<Link to={'newgame'} />}
         />
         <Button
           label="rules"
           labelStyle={{color:'white'}}
           containerElement={<Link to={'rules'} />}
         />
        </div>
      }
    />
  )
}


/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    user: state.game.self
  }
};

const mapDispatch = dispatch => {
  return {
    login: (user, pw) => {
      dispatch(login(user, pw))
    },
    logout: () => {
      dispatch(logout())
    }
  }
};

export default connect(mapState, mapDispatch)(Navbar);
