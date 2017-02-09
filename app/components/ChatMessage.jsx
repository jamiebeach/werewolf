import React from 'react';

function ChatMessage(props) {
  let message = props.message;
  let players = props.players;
  let color = props.message.color;
  console.log("inside ChatMessage, color = ", color);
  return (

    <li
      className="message"
    >
      <div className="avatar">

        {message.user !== 'moderator' ?
          <img
            src={`/images/avatar${players[message.user].avatar}.jpg`}
            /*style={ { border: `3px solid ${players[message.user].color}` } }*/
          /> : <img src={`/images/avatar000.jpg`}/>
        }
      </div>
      <div className="text-content">
        <div
          className="player-name"
          style={ message.user !== 'moderator' ? { color: `${players[message.user].color}` } : color }
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
