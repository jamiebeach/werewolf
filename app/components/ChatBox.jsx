import React, {Component} from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import InputChat from './InputChat';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
//import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo';


const ChatBox = (props) => {
  const fakeMessages = [
    ["you", "blah blah"],
    ["cat", "blah blah"],
    ["you", "blah blah"],
    ["cat", "blah blah"],
    ["you", "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"],
    ["cat", "blah blah"],
    ["you", "blah blah"],
    ["cat", "blah blah"],
    ["you", "blah blah"],
    ["cat", "blah blah blah blah blah blah blah blah blah blah blah blah blah blah"],
  ]
  //props.messages = fakeMessages;
  const catAv = "https://cdn2.iconfinder.com/data/icons/pet-2/100/06-512.png";
  const youAv = "http://www.freeiconspng.com/uploads/face-head-woman-female-icon-2.png";
    return (

  <div style={{marginLeft: "15%", marginRight: "15%"}}>
    <GridList
      style={{
        maxHeight: window.innerHeight*.6,
        overflowY: 'auto'
      }}
      cols={1}
      cellHeight="auto"
      >
      {fakeMessages.map((message, index) => {return (
        <div key={index} style={{textAlign: (message[0] === 'cat') ? "left" : "right"}}>
           <Paper id="statement-bubble" zDepth={1} style={{display: "inline-block"}} className={`statement-by-${message[0]}`}>
                <div>
                  <h3 style={{margin: "5px"}}> {message[0].toUpperCase()} </h3>
                  <p style={{marginLeft: "5px", marginRight: "5px"}}> {message[1]} </p>
                </div>
              </Paper>
        </div>
      )})}
    </GridList>
    <InputChat addMessage={()=> {}}/>
  </div>
)}

export default ChatBox;