import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog className='victory-dialog'
          title={`${this.props.winner} won!`}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className='victory-modal-container'>
            <img
              className='victory-modal'
              src={ this.props.winner ?
                "/images/villagersvictory.jpg" :
                "/images/werewolvesvictory.jpg" }
            />
          </div>

        </Dialog>
      </div>
    );
  }
}
