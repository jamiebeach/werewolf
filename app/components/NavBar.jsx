import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

/* -----------------    COMPONENT     ------------------ */

const Navbar = () => {

  return (
    <div className='navbar'>
      <div >
        <IconButton
          className='navBtnLeft'
          onClick={() => browserHistory.push('/home')}
          >
          <ActionHome
            color={'#FFFFFF'}
            hoverColor={'#D6C967'}
          />
        </IconButton>
        <h3 className='navBtnLeft'>Nightfall</h3>
      </div>
      <div className="navBtnRight">
       <Link className='icons' to={'rules'} >Rules</Link>
      </div>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    user: state.game.player
  }
};

const mapDispatch = dispatch => {
  return {
  }
};

export default connect(mapState, mapDispatch)(Navbar);
