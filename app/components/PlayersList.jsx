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
        Object.keys(players).map((person, index) => {
          return (
            <div
              className='players'
              key={index}
              style={ players[person].alive ? {backgroundColor: 'rgba(255, 255, 255, .5)'} : { backgroundColor: 'rgba(192, 192, 192, .5)' } }
              >

              <div className='avatar' >
                <img
                  src={`/images/avatar${players[person].avatar}.jpg`}
                  style={ { border: `2.5px solid ${players[person].color}` } }
                />
              </div>

              <div
                className='player-name'
                style = { { textDecoration: dead(players[person]) } } >
                {player.name}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PlayersList;
