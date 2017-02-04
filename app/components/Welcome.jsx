import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import fetchUsers from '../reducers/game';
import RaisedButton from 'material-ui/RaisedButton';


/* -----------------    COMPONENT     ------------------ */

export const Welcome = () => {
	return (
		<div className='splash'>
					<div className='leftMargin' >
						<h1 >Werewolf</h1>
					</div>
					<div className='leftMargin'>
						<h2 >What side will you be on when night falls? </h2>
					</div>
					<div className='leftMargin rightMargin'>
						<p>One minute you're a Villager, defending your theoretical home with every fiber of your being. 
						The next, you're a Werewolf, framing your friends and accusing them of wanting to destroy your village, 
						when really it's you who's been infiltrating it all along. Each game becomes an epic phenomenon, 
						designed to test your personal judgement and moral character.</p>
						<RaisedButton onClick={}  label="Start a Game" backgroundColor={'#F00'}/>
					</div>

		</div>
	)

}


/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({});
const mapDispatch = () => ({});

const handleClick = () => {
	
}

export default connect(mapState, mapDispatch)(Welcome);


/* -----------------    STYLES     ------------------ */

