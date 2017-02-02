import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sphinx from './Sphinx';
import Riddle from './Riddle';
import {addImage,updateGuessed} from '../reducers/riddle';
import ChatBox from './ChatBox';
import PlayersList from './PlayersList';

const SphinxContainer = props => {
  return(
    <div className="home">
      <div className="chat">
        {
          (props.day || props.user.night || !props.user.alive)
          ? <ChatBox user={props.user} messages={props.messages} day={props.day}/>
          : <Sphinx/>
        }
      </div>
      <div className="playerslist">
        <PlayersList user={props.user} players={props.players} day={props.day}/>
      </div>
    </div>
  )
}

  const fakePlayers = [
    {
      name: "Bob",
      role: "villager",
      alive: true,
      immunity: false,
      night: false
    },
    {
      name: "Bobette",
      role: "werewolf",
      alive: true,
      immunity: false,
      night: true
    },
    {
      name: "Rob",
      role: "villager",
      alive: true,
      immunity: false,
      night: false
    },
    {
      name: "Roberta",
      role: "villager",
      alive: false,
      immunity: false,
      night: false
    },
    {
      name: "Bobby",
      role: "werewolf",
      alive: false,
      immunity: false,
      night: true
    },
    {
      name: "Robbie",
      role: "doctor",
      alive: false,
      immunity: false,
      night: true
    },
    {
      name: "Robespierre",
      role: "villager",
      alive: true,
      immunity: false,
      night: false
    },
    {
      name: "NotBob",
      role: "seer",
      alive: true,
      immunity: false,
      night: true
    },
    {
      name: "Other",
      role: "villager",
      alive: true,
      immunity: false,
      night: false
    },
    {
      name: "People",
      role: "villager",
      alive: false,
      immunity: false,
      night: false
    },
    {
      name: "To",
      role: "werewolf",
      alive: true,
      immunity: false,
      night: true
    },
    {
      name: "Test",
      role: "villager",
      alive: false,
      immunity: false,
      night: false
    },
    {
      name: "Scrolling",
      role: "villager",
      alive: true,
      immunity: false,
      night: false
    },
  ];

  const day = false;

  const bobette = {  // live werewolf
    name: "Bobette",
    role: "werewolf",
    alive: true,
    immunity: false,
    night: true
  };
  const notbob = {  // live seer
    name: "NotBob",
    role: "seer",
    alive: true,
    immunity: false,
    night: true
  };
  const rob = {  // live villager
    name: "Rob",
    role: "villager",
    alive: true,
    immunity: false,
    night: false
  };
  const roberta = {  // dead villager
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false
  }
  const bobby = {  // dead werewolf
    name: "Bobby",
    role: "werewolf",
    alive: false,
    immunity: false,
    night: true
  }

  const fakeMessages = [
    ["Rob", "blah blah blah blah", "day"],
    ["NotBob", "blah blah", "day"],
    ["Bobette", "blah blah blah", "day"],
    ["Roberta", "blah blah blah blah blah blah", "day"],
    ["Bobby", "blah blah blah blah blah blah blah blah", "day"],
    ["Robert", "blah blah blah blah blah blah blah blah", "day"],
    ["Rob", "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah", "day"],
    ["To", "blah blah blah blah", "werewolf"],
    ["Bobette", "blah blah blah blah blah blah", "werewolf"],
    ["Bobby", "blah blah blah", "werewolf"],
    ["To", "blah blah blah blah blah ", "werewolf"],
    ["Bobette", "blah blah blah blah blah blah blah blah blah blah blah blah", "werewolf"],
    ["NotBob", "blah blah blah blah", "seer"],
    ["Robbie", "blah blah blah blah blah", "doctor"],
  ]

const mapStateToProps = state => {
  return {
    players: fakePlayers,
    user: bobette,
    day: false,
    messages: fakeMessages
  };
};

const mapDispatchToProps = dispatch => {
  return ({
    dispatchAddImage (image) {
      return dispatch(addImage(image));
    },
    dispatchUpdateGuessed (tags) {
      return dispatch(updateGuessed(tags));
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SphinxContainer);

