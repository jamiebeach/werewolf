import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami, changeName, checkValidName} from './reducers/auth'
import {fetchUsers, sendMessageAction, updateGameActions, sendVoteAction, addUser, tallyVotes, assignRoles, sendPeekAction} from './reducers/game'

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware))

export default store

// Set the auth info at start
store.dispatch(whoami())
// store.dispatch(fetchUsers())

store.dispatch(updateGameActions())
// setTimeout(function() {
//   store.dispatch(checkValidName("jenny"))
// }, 2000);
// setTimeout(function() {
//   store.dispatch(assignRoles());
// }, 3000);

// store.dispatch(sendMessageAction('jenny', 'testing', 'villager'))
// store.dispatch(sendMessageAction('jenny', 'testing', 'wolf'))
// store.dispatch(sendMessageAction('jenny', 'testing', 'priest'))

// store.dispatch(tallyVotes());

store.dispatch(sendPeekAction("jenny", "garity"));







