import React, {Component} from 'react';

// import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';  // star
import Healing from 'material-ui/svg-icons/image/healing';
import Eye from 'material-ui/svg-icons/image/remove-red-eye';
import Checkbox from 'material-ui/Checkbox';

// expects players, user, and day from props

// villager, werewolf, seer, doctor, ... cupid, lovers, hunter, mayor


const PlayersList = (props) => {
  const day = props.day;
  const user = props.user;
  const players = {
   bobette :{  // live werewolf
    name: "Bobette",
    role: "villager",
    alive: true,
    immunity: false,
    night: true
  },
   notbob :{  // live seer
    name: "NotBob",
    role: "seer",
    alive: true,
    immunity: false,
    night: true
  },
   rob :{  // live villager
    name: "Rob",
    role: "villager",
    alive: true,
    immunity: false,
    night: false
  },
   roberta :{  // dead villager
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false
  }}

  const pickColor = (player, user, day) => {
    if ((user.role === "werewolf") && (player.role === "werewolf") || (!user.alive && (player.role === "werewolf"))) return "thistle";
    if ((!user.night && !day) || ((user.night && !day) && (player.role !== user.role))) return "lightgrey";
    else return "white";
  }

  const dead = (player) => {
    if (!player.alive) return "line-through";
    else return null;
  }

  const getIcon = (player, user) => {
    if (((!user.alive) || (user.role === "doctor")) && (player.role === "doctor")) return <Healing/>;
    else if (((!user.alive) || (user.role === "seer")) && (player.role === "seer")) return <Eye/>;
    else return null;
  }

  return (
    <div className='listContainer'>
      <List>
      {Object.keys(players).map((player, index) => {return (
        <ListItem
          id={players[player].uid}
          key={index}
          primaryText={player}
          leftIcon={getIcon(player, user)}
          leftCheckbox={(((player === user.name) || !players[player].alive) || !user.alive) ? null :<Checkbox iconStyle={{fill: "#6E0300"}}/>}
          insetChildren={true}
          style={{
            backgroundColor: pickColor(players[player], user, day),
            textDecoration: dead(players[player]),
            fontFamily: 'IM Fell English SC, serif'
          }}
        />
      )})}
      </List>

    </div>
  )
}

export default PlayersList;
