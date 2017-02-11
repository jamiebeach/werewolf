import React from 'react';
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';


/* -----------------    COMPONENT     ------------------ */

const Welcome = () => {
	return (
		<div className='splash'>
			<div className='text-box ' >
				<div className='landingText'>
					<h1>Nightfall</h1>
					<h2>What side will you be on when night falls? </h2>
					<h3>Your quiet little 16th century village has suddenly become infested with some very unfriendly werewolves...
					can you and the other villagers find them before they devour everyone?</h3>
					<h3>Play with your friends! Minimum 5 players.</h3>
				</div>
			</div>
			<div className='buttonContainer'>
				<div className='landingButton'>
					<RaisedButton
						label="New Game"
						backgroundColor={'#1E052B'}
						labelStyle={ {color: 'white', fontFamily: 'IM Fell English SC'} }
						containerElement={ <Link to="/newgame" /> }
					/>
				</div>
				<div className='gameButton'>
					<RaisedButton
						label="Open Games"
						backgroundColor={'#0D7A58'}
						labelStyle={ {color: 'white', fontFamily: 'IM Fell English SC'} }
						containerElement={ <Link to="/opengames" /> }
					/>
				</div>
			</div>
		</div>
	)
}



export default Welcome;

