'use strict'
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import Welcome from './components/Welcome';
import JoinGame from './components/JoinGame';
import NewGame from './components/NewGame';
import Rules from './components/Rules';
import OpenGames from './components/OpenGames';
import GameContainer from './components/GameContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { recieveGameId, fetchAllGames, recieveTakenName} from './reducers/game';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const onGameEnter = nextRouterState => {
  const gameId = nextRouterState.params.id;
  store.dispatch(recieveGameId(gameId));
  const roster = firebase.database().ref(`games/${gameId}/roster`)


  // gets all playernames from roster and adds it to store in takennames array
  roster.on('child_added', function(player) {
    store.dispatch(recieveTakenName(player.val().name));
  })
}

// stops listening to roster if you leave that specific game and try to join a new one
// the '!' tells the store to clear the takennames array
const onGameLeave = nextRouterState => {
  const gameId = nextRouterState.params.id;
  firebase.database().ref(`games/${gameId}/roster`).off();
  store.dispatch(recieveTakenName('!'));
}

const onAppEnter = () => {
  store.dispatch(fetchAllGames());
}

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={onAppEnter}>
          <IndexRedirect to="/home" />
          <Route path="/home" component={Welcome} />
          <Route path="/newgame" component={NewGame} />
          <Route path="/rules" component={Rules} />
          <Route path="/opengames" component={OpenGames} />
          <Route path="/joingame/:id" component={JoinGame} />
          <Route path="/game/:id" component={GameContainer} onEnter={onGameEnter} onLeave={onGameLeave}/>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
