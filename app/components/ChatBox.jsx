import React from 'react';

import {GridList} from 'material-ui/GridList';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import InputChat from './InputChat';
import Paper from 'material-ui/Paper';
//import FontIcon from 'material-ui/FontIcon';

const ChatBox = (props) => {
  const day = props.day;
  const user = props.user;
  const messages = props.messages.filter(message => {
    if (day) return (message[2] === "day");
    else if (!user.alive) return (message[2] !== "day");
    else return (message[2] === user.role);
  })

  return (

    <div id="chat-container">
      <GridList
        style={{
          maxHeight: window.innerHeight*.6,
          overflowY: 'auto'
        }}
        cols={1}
        cellHeight="auto"
        >
        {messages.map((message, index) => {return (
          <div key={index} id="all-statements" style={{textAlign: (message[0] !== user.name) ? "left" : "right"}}>
            <Paper id="statement-bubble" zDepth={1} style={{display: "inline-block"}} className={`statement-by-${message[0]}`}>
              <div id="player-name">
                {message[0].toUpperCase()}
              </div>
              <div id="statement">
                {message[1]}
              </div>
            </Paper>
          </div>
        )})}
      </GridList>
      <InputChat addMessage={()=> {}} user={user}/>
    </div>
  )
}

export default ChatBox;
