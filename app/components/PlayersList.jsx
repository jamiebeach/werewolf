import React from 'react';
// expects players, user, and day from props
// villager, werewolf, seer, doctor, ... cupid, lovers, hunter, mayor

const PlayersList = (props) => {
  const day = props.day;

  const player = props.player;
  const players = props.players;

  const pickColor = (player, user, day) => {
    if ((user.role === 'werewolf') && (player.role === 'werewolf') || (!user.alive && (player.role === 'werewolf'))) return 'thistle';
    if ((!user.night && !day) || ((user.night && !day) && (player.role !== user.role))) return 'lightgrey';
    else return 'white';
  }

  const dead = (player) => {
    if (!player.alive) return 'line-through';
    else return null;
  }

  const getIcon = (player, user) => {
    if (((!user.alive) || (user.role === 'doctor')) && (player.role === 'doctor')) return <Healing/>;
    else if (((!user.alive) || (user.role === 'seer')) && (player.role === 'seer')) return <Eye/>;
    else return null;
  }

  return (
    <div className='players-list'>
      {
        Object.keys(players).map((player, index) => {
          return (
            <div
              className='players'
              key={index}
              style={ players[player].alive ? {backgroundColor: 'white'} : { backgroundColor: 'grey', opacity: 0.8 } }
              >

              <div className='avatar' >
                <img
                  src={`images/avatar${players[player].avatar}.jpg`}
                  style={ { border: `2.5px solid ${players[player].color}` } }
                />
              </div>

              <div
                className='player-name'
                style = { { textDecoration: dead(players[player]) } } >
                {player}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PlayersList;


/*<<<<<<< HEAD
    <div style={{marginLeft: '15%', marginRight: '15%'}}>
      <GridList
        style={{
          maxHeight: window.innerHeight*.6,
          overflowY: 'auto'
        }}
        cols={1}
        cellHeight="auto"
        >

        <List>
        {Object.keys(players).map((player, index) => {return (
          <ListItem
            id={players[player].uid}
            key={index}
            primaryText={player}
            leftIcon={getIcon(player, user)}
            leftCheckbox={
              (
                ((player === user.name) || !players[player].alive) ||
                !user.alive
              ) ? null : <Checkbox iconStyle={{fill: '#6E0300'}} />
            }
            insetChildren={true}
            style={{
              backgroundColor: pickColor(players[player], user, day),
              textDecoration: dead(players[player])
            }}
          />
        )})}
        </List>
      </GridList>
=======*/

// style={{
//             backgroundColor: props.color,
//             textDecoration:  props.dead,
//             fontFamily: 'IM Fell English SC, serif'

const players = {
  bobette :{  // live werewolf
    name: "Bobette",
    role: "villager",
    alive: true,
    immunity: false,
    night: true,
    avatar: 'm01',
    color: 'chocolate',
  },
   notbob :{  // live seer
    name: "NotBob",
    role: "seer",
    alive: true,
    immunity: false,
    night: true,
    avatar: 'm11',
    color: 'purple',
  },
   rob :{  // live villager
    name: "Rob",
    role: "villager",
    alive: true,
    immunity: false,
    night: false,
    avatar: 'm07',
    color: 'yellow',
  },
   roberta :{  // dead villager
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false,
    avatar: 'f10',
    color: 'darkcyan',
  },
  jenny : {
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false,
    avatar: 'f01',
    color: 'darkslategrey'
  },
  a :{  // live werewolf
    name: "Bobette",
    role: "villager",
    alive: true,
    immunity: false,
    night: true,
    avatar: 'm01',
    color: 'chocolate',
  },
  b :{  // live seer
    name: "NotBob",
    role: "seer",
    alive: true,
    immunity: false,
    night: true,
    avatar: 'm11',
    color: 'purple',
  },
  c :{  // live villager
    name: "Rob",
    role: "villager",
    alive: true,
    immunity: false,
    night: false,
    avatar: 'm07',
    color: 'yellow',
  },
  d :{  // dead villager
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false,
    avatar: 'f10',
    color: 'darkcyan',
  },
  e: {
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false,
    avatar: 'f01',
    color: 'darkslategrey'
  },
  angel :{  // live werewolf
    name: "Bobette",
    role: "villager",
    alive: true,
    immunity: false,
    night: true,
    avatar: 'm01',
    color: 'chocolate',
  },
  melanie :{  // live seer
    name: "NotBob",
    role: "seer",
    alive: true,
    immunity: false,
    night: true,
    avatar: 'm11',
    color: 'purple',
  },
  isaac :{  // live villager
    name: "Rob",
    role: "villager",
    alive: true,
    immunity: false,
    night: false,
    avatar: 'm07',
    color: 'yellow',
  },
  james :{  // dead villager
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false,
    avatar: 'f10',
    color: 'darkcyan',
  },
  jeffery : {
    name: "Roberta",
    role: "villager",
    alive: false,
    immunity: false,
    night: false,
    avatar: 'f01',
    color: 'darkslategrey'
  }
}
