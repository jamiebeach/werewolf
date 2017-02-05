import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'
import {fetchUsers, updateGameActions} from './reducers/game'

import Moderator from './moderator/moderator'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(createLogger(), thunkMiddleware)
))

export default store

// Set the auth info at start

store.dispatch(whoami())
store.dispatch(fetchUsers())

store.dispatch(updateGameActions())

const mod = new Moderator('testinggame', 'felicia', 1);
mod.handleJoin({name: 'felicia', uid: 1});
mod.handleJoin({name: 'jenny', uid: 2});
mod.handleJoin({name: 'garity', uid: 3});
mod.handleJoin({name: 'gladys', uid: 4});
mod.handleJoin({name: 'ashi', uid: 5});
mod.handleJoin({name: 'galen', uid: 6});
mod.handleStart();
mod.handleLeaderStart();

// setTimeout(() => {
//   mod.handleVote({user: 'felicia', vote: 'jenny'})
//   mod.handleVote({user: 'gladys', vote: 'galen'})
//   mod.handleVote({user: 'garity', vote: 'galen'})
//   mod.handleVote({user: 'gladys', vote: 'galen'})
//   mod.handleVote({user: 'ashi', vote: 'jenny'})
//   mod.handleScry({user: 'felicia', role: 'seer', target: 'garity'})
//   // mod.handleSave({user: 'jenny', role: 'priest', target: 'jenny'})

// }, 6000)

// setTimeout(() => {
//   mod.handleVote({user: 'felicia', vote: 'jenny'})
//   mod.handleVote({user: 'garity', vote: 'jenny'})
//   mod.handleVote({user: 'gladys', vote: 'galen'})
//   mod.handleVote({user: 'garity', vote: 'galen'})
//   mod.handleVote({user: 'gladys', vote: 'galen'})
//   mod.handleVote({user: 'ashi', vote: 'jenny'})
//   mod.handleScry({user: 'felicia', role: 'seer', target: 'garity'})
//   mod.handleSave({user: 'jenny', role: 'priest', target: 'jenny'})

// }, 12000)





// store.dispatch(tallyVotes())
