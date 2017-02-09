import React from 'react';
// expects players, user, and day from props
// villager, werewolf, seer, doctor, ... cupid, lovers, hunter, mayor

const PlayersList = (props) => {
  const day = props.day;
  const player = props.player;
  const players = props.players;

  const vote = props.vote;
  const chooseVote = props.chooseVote;
  const sendVote = props.sendVote;

  const dead = (player) => {
  if (!player.alive) return 'line-through';
  else return null;
}

  const pickColor = (person, currentPlayer, day) => {
    if
      ( // if both the player and the person on the roster are werewolves, or if the player is dead, show werewolf color
        (person.role === 'werewolf') && (!day) &&
        (!currentPlayer.alive || (currentPlayer.role === 'werewolf'))
      ) return { backgroundColor: 'rgba(214, 201, 103, .8)' };

    else if (!person.alive) return { backgroundColor: 'rgba(192, 192, 192, .5)' }
    else return {};
  }

  // const getIcon = (player, user) => {
  //   if (((!user.alive) || (user.role === 'doctor')) && (player.role === 'doctor')) return <Healing/>;
  //   else if (((!user.alive) || (user.role === 'seer')) && (player.role === 'seer')) return <Eye/>;
  //   else return null;
  // }

  return (
    <div className="players-list" >
      {
        Object.keys(players).map((person, index) => {
          return (
            <div
              className={ day ? 'players light' : 'players dark' }
              key={index}
<<<<<<< HEAD
              style={ !players[person].alive ? { backgroundColor: 'rgba(192, 192, 192, .5)' } : {} }
              onClick={}
=======
              style={pickColor(players[person], player, day)}
>>>>>>> 454af184ce77ec92297c95d81f4a0e6a1809ec39
            >
              <div className="avatar" >
                <img
                  src={`/images/avatar${players[person].avatar}.jpg`}
                  style={ { border: `2.5px solid ${players[person].color}` } }
                />
              </div>

              <div
                className="player-name"
                style = { { textDecoration: dead(players[person]) } } >
                {players[person].name}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PlayersList;
