import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import CircularProgressbar from 'react-circular-progressbar';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      percentage: 100,
      time: 119,
    }

    this.timer = this.timer.bind(this);
    this.showTime = this.showTime.bind(this);
  }

  showTime() {
    const min = Math.floor(this.state.time/60);
    let sec = (this.state.time - min * 60) + '';
    if (sec.length !== 2) sec = '0' + sec;
    return `${min}:${sec}`;
  }

  timer() {
    let maxTime = (this.props.day) ? 120 : 60;
    let newTime = this.state.time - 1;
    if (newTime === 0) clearInterval(this.state.intervalId);
    this.setState({ time: this.state.time - 1, percentage: newTime/maxTime * 100 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.day && !this.props.day) { // day to night
      clearInterval(this.state.intervalId);
      this.setState({time: 58, percentage: 100, intervalId: setInterval(this.timer, 1000)});
    }
    else if (!prevProps.day && this.props.day) { // night to day
      clearInterval(this.state.intervalId);
      this.setState({time: 119, percentage: 100, intervalId: setInterval(this.timer, 1000)})
    }
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navBtnLeft'>
          <IconButton
            onClick={() => browserHistory.push('/home')}
            >
            <ActionHome
              color={'#FFFFFF'}
              hoverColor={'#D6C967'}
            />
          </IconButton>
          <h3>Nightfall</h3>
        </div>

        <div className="navBtnRight">
          {(this.props.gameInProgress)
            ? <CircularProgressbar
                percentage={this.state.percentage}
                strokeWidth={4}
                textForPercentage={this.showTime}
              />
            : null
          }
        <Link className='icons' to={'rules'} >Rules</Link>
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    user: state.game.player,
    day: state.game.day,
    gameInProgress: state.game.gameInProgress
  }
};

const mapDispatch = dispatch => {
  return {
  }
};

export default connect(mapState, mapDispatch)(Navbar);
