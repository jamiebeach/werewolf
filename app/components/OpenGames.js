import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

/* -----------------    COMPONENT     ------------------ */
let scrollDiv = {};
const OpenGames = (props) => {
  return (
    <div className='splash'>
      <div
        className='openGamesTextBox'>
        <div className='landingText'>
        <h1>Open Games</h1>
          {(scrollDiv.clientHeight > 255)
            ? <h3>(Scroll Down for More)</h3>
            : null
          }
          <div
            className='flexContainer'
            ref={(div) => {scrollDiv = div;}}
          >
          {props.games.map((game, index) => {
            return (
              <Link to={`/game/${game.id}`} className='flexItems' style={{color: 'white'} } key={index} >
                <h3> {game.name} </h3>
              </Link>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    games: state.game.games
  };
};

export default connect(mapStateToProps)(OpenGames);
