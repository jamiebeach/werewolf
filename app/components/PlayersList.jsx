import React, {Component} from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
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
  const players = props.players;

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
    <div style={{marginLeft: "15%", marginRight: "15%"}}>
      <GridList
        style={{
          maxHeight: window.innerHeight*.6,
          overflowY: 'auto'
        }}
        cols={1}
        cellHeight="auto"
        >
        <List>
        {players.map((player, index) => {return (
          <ListItem
            id="player"
            key={index}
            primaryText={player.name}
            leftIcon={getIcon(player, user)}
            leftCheckbox={(((player.name === user.name) || !player.alive) || !user.alive) ? null :<Checkbox />}
            insetChildren={true}
            style={{
              backgroundColor: pickColor(player, user, day),
              textDecoration: dead(player)
            }}
          />
        )})}
        </List>
      </GridList>
    </div>
  )
}

export default PlayersList;