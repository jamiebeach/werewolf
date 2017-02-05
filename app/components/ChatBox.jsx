import React, { Component } from 'react';

import {GridList} from 'material-ui/GridList';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import InputChat from './InputChat';
import Paper from 'material-ui/Paper';
import ChatMessage from './ChatMessage';
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
        <ul className="chat-window">
          {messages.map((message, index) => {
            return <ChatMessage message={message} user={user} index={index} key={index}/>
          })}
        </ul>
        <InputChat addMessage={()=> {}} user={user}/>
      </div>
    )
  }
}

export default ChatBox;
