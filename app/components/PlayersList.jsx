import React, {Component} from 'react';
import ListItem from './ListItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';



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
      <ul className='list'>
      {Object.keys(players).map((player, index) => {return (
        <ListItem
          id={players[player].uid}
          key={index}
          primaryText={player}
          color= {pickColor(players[player], user, day)}
          dead=  {dead(players[player])}
        />
      )})}
      </ul>
    </div>
  )
}

export default PlayersList;


// leftIcon={getIcon(player, user)}
// leftCheckbox={(((player === user.name) || !players[player].alive) || !user.alive) ? null :<Checkbox iconStyle={{fill: "#6E0300"}}/>}
// insetChildren={true}
