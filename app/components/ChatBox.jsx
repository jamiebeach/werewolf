import React, { Component } from 'react';

import InputChat from './InputChat';
import ChatMessage from './ChatMessage';


class ChatBox extends Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if ((this.chatScroll.scrollTop + this.chatScroll.clientHeight) < this.chatScroll.scrollHeight) {
      this.scrolledUp = true;
    }
    else {
      this.scrolledUp = false;
    }
  }

  componentDidMount() {
    this.scrolledUp = false;
  }

  componentDidUpdate() {
    if (!this.scrolledUp) this.chatScroll.scrollTop = this.chatScroll.scrollHeight;
  }

  render() {
    const day = this.props.day;
    const players = this.props.players;
    const messages = this.props.messages;

    return (
      <div id="chat-window-container">
        <ul
          className="chat-window"
          onScroll={this.handleScroll}
          ref={
            (div) => {
              this.chatScroll = div;
            }
          }
        >
          {messages.map((message, index) => {
            return <ChatMessage message={message} players={players} key={index}/>
          })}
        </ul>
        <InputChat {...this.props}/>
      </div>
    )
  }
}

export default ChatBox;
