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
import ActionGrade from 'material-ui/svg-icons/action/grade';

// expects players, user, and day from props

// villager, werewolf, seer, doctor, ... cupid, lovers, hunter, mayor


const PlayersList = (props) => {
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

  const user = {
    name: "Bobette",
    role: "werewolf",
    alive: true,
    immunity: false,
    night: true
  };
  // const user = {
  //   name: "NotBob",
  //   role: "seer",
  //   alive: true,
  //   immunity: false,
  //   night: true
  // };
  // const user = {
  //   name: "Rob",
  //   role: "villager",
  //   alive: true,
  //   immunity: false,
  //   night: false
  // };

  const day = true;

  const pickColor = (player, user, day) => {
    if ((user.role === "werewolf") && (player.role === "werewolf")) return "thistle";
    if ((!user.night && !day) || ((user.night && !day) && (player.role !== user.role))) return "lightgrey";
    else return "white";
  }

  const dead = (player) => {
    if (!player.alive) return "line-through";
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
        {fakePlayers.map((player, index) => {return (
          <ListItem
            id="player"
            key={index}
            primaryText={player.name}
            leftIcon={(player.name === user.name) ? <ActionGrade /> : null}
            insetChildren={(player.name !== user.name)}
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