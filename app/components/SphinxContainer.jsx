import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sphinx from './Sphinx';
import Riddle from './Riddle';
import {addImageUrl, updateGuessed} from '../reducers/riddle';


const SphinxContainer = props => {
  return(
    <div className="home">
      <div className="chat">
        <Riddle
          currentRiddle={props.currentRiddle}
          solution={props.solution}
          guessed={props.guessed}
          guessedCorrectly={props.guessedCorrectly}
          imageUrl={props.imageUrl}
          feedback={props.feedback}
          dispatchUpdateGuessed={props.dispatchUpdateGuessed}
          dispatchAddImageUrl={props.dispatchAddImageUrl}
        />
      </div>
      <div className="cat">
        <Sphinx />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentRiddle: state.riddle.currentRiddle,
    solution: state.riddle.solution,
    guessed: state.riddle.guessed,
    guessedCorrectly: state.riddle.guessedCorrectly,
    imageUrl: state.riddle.imageUrl,
    feedback: state.riddle.feedback
  };
};

const mapDispatchToProps = dispatch => {
  return ({
    dispatchAddImageUrl (imageUrl) {
      return dispatch(addImageUrl(imageUrl));
    },
    dispatchUpdateGuessed (tags) {
      return dispatch(updateGuessed(tags));
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SphinxContainer);

