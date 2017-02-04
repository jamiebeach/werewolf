import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import fetchUsers from '../reducers/game';

//import ChatBox from './ChatBox';
// import NavBar from './Navbar';


/* -----------------    COMPONENT     ------------------ */

export const Welcome = () => {
	return (
		<div className='splash'>
			{/*<div className='chat'>
          <ChatBox
            messages={[]}
            addMessage={() => {}}
          />
       </div>*/}

					<div style={ styles.txt }>
						<h1 style={ styles.heading1 } onClick={fetchUsers}>Werewolves</h1>
					</div>

					<div style={ styles.txt }>
						<h2 style={ styles.heading2 }>your quiet little 16th century village has suddenly become infested with some very unfriendly werewolves... can you and the other villagers find them before they eliminate everyone? <br/><br/>
							<Link to={'/login'} style={ styles.adopt }>start where you left off  </Link>
							  or
							<Link to={'/chat'} style={ styles.adopt }>  continue as a guest</Link>
						</h2>
					</div>

		</div>
	)

}


/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({});
const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(Welcome);


/* -----------------    STYLES     ------------------ */

const styles = {
	txt: {
		fontFamily: 'Roboto',
		color: 'white',
		marginLeft: '10%',
	},
	heading1: {
		fontSize: '4em',
		marginTop: '20%',
	},

	adopt: {
		textDecoration: 'none',
	},
}
