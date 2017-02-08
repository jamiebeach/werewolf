import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'
import {fetchUsers, updateGameActions} from './reducers/game'

import Moderator from './moderator/moderator'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const dumbLogger = store => next => action => {
//   const oldState = store.getState()
//   const rVal = next(action)
//   const newState = store.getState()
//   console.log(
//     JSON.stringify({
//       oldState, newState,
//       action: typeof action !== 'function' ? action : action.toString(),
//     }, 0, 2))
//   return rVal
// }

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(
    createLogger(),
    thunkMiddleware)
))

store.dispatch(whoami())

export default store
