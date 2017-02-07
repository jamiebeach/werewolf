import React, { Component } from 'react';

import {GridList} from 'material-ui/GridList';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import InputChat from './InputChat';
import Paper from 'material-ui/Paper';
import ChatMessage from './ChatMessage';


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
    const self = this.props.self;
    const messages = this.props.messages;

    return (

      <div id="chat-window-container">
        <ul className="chat-window">
          {messages.map((message, index) => {
            return <ChatMessage message={message} self={self} index={index} key={index}/>
          })}
        </ul>
        <InputChat {...this.props}/>
      </div>
    )
  }
}

export default ChatBox;
