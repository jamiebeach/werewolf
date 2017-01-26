import React, { Component } from 'react';
import {connect} from 'react-redux';
import Markov from '../../server/markov/markov';
import alice from '../../server/markov/books/alice';
import addMessage from '../reducers/chat';
import axios from 'axios';
// import lookingglass from '../../server/markov/books/lookingglass';


// eventually this has to connect to have access to user, etc
class Chat extends Component {
  constructor() {
    super();
    // create a new markov chain and give it alice in wonderland
    const markov = new Markov(2);
    markov.add(alice);

    this.state = {
      markov: markov,
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // add your message to the key/value table
    const yourMessage = e.target.message.value;
    addMessage(yourMessage);
    this.state.markov.add(yourMessage);
    // messages1 and messages2 is used to delay the cat's response
    const messages1 = [
      ...this.state.messages,
      `You: ${yourMessage}`  // add your message to messages
      ];
    const catMessage = this.state.markov.generate();
    const messages2 = [
      ...messages1,
      `Cat: ${catMessage}`  // generate a sentence and add it to messages
      ];
    // immediately update state with your message and clear the text input
    this.setState({messages: messages1});
    e.target.message.value = '';

    // wait 2 seconds and update state with the cat's message
    setTimeout(() => this.setState({messages: messages2}), 2000);
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="message"
            placeholder="Enter message here"
          />
          <input
            type="submit"
            value="Send to Cat"
          />
        </form>
        {this.state.messages.length
          ? <div>
              {this.state.messages.map((message, i) =>
                (<div key={i} style= {{color: /You/.test(message) ? "darkblue" : "darkred"}}>{message}</div>)
                )}
            </div>
          : null
        }
      </div>
    )
  }
}

export default connect() (Chat);
