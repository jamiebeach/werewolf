import React, { Component } from 'react';

import {GridList} from 'material-ui/GridList';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import InputChat from './InputChat';
import Paper from 'material-ui/Paper';
//import FontIcon from 'material-ui/FontIcon';

class ChatBox extends Component {
  constructor() {
    super();
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
    this.lastMessage.scrollIntoView();
  }

  componentDidMount() {
    //this.scrollToBottom();
  }

  componentDidUpdate() {
    //this.scrollToBottom();
  }

  render() {
    const day = this.props.day;
    const user = this.props.user;
    const messages = this.props.messages;

    return (

      <div id="chat-window-container">
        <GridList
          className="chat-window"
          cols={1}
          cellHeight="auto"
          >
            {messages.map((message, index) => {return (
              <div
                key={index}
                id="all-statements"
                style={{textAlign: (message.user !== user.name) ? "left" : "right"}}
                ref={(div) => {
                  if ((messages.length - 1) === index) this.lastMessage = div;
                }}
              >
                <Paper id="statement-bubble" zDepth={1} style={{display: "inline-block"}} className={`statement-by-${message.user}`}>
                  <div id="player-name">
                    {message.user.toUpperCase()}
                  </div>
                  <div id="statement">
                    {message.text}
                  </div>
                </Paper>
              </div>
            )})}
        </GridList>
        <InputChat addMessage={()=> {}} user={user}/>
      </div>
    )
  }
}

export default ChatBox;
