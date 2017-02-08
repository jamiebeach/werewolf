import React from 'react';

function ChatMessage(props) {
  let message = props.message;
  let players = props.players;

  return (

    <li
      className="message"
    >
      <div className="avatar">
       {console.log(props)}
        {message.user !== 'moderator' ?
          <img
            src={`/images/avatar${players[message.user].avatar}.jpg`}
            /*style={ { border: `3px solid ${players[message.user].color}` } }*/
          /> : <div>special mod styling</div>
        }
      </div>
      <div className="text-content">
        <div
          className="player-name"
          style={ message.user !== 'moderator' ? { color: `${players[message.user].color}` } : { color: 'black'} }
        >
          {message.user.toUpperCase()}
        </div>
        <div className="message-content">
          {message.text}
        </div>
      </div>
    </li>);
}

export default ChatMessage
