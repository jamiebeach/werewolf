const game = "testgame";

const initialState = {
  users: {},
  votes: [],
  day: true,
  test:'',
  villager: [],
  seer: [],
  priest: [],
  wolf: [],
  self: {},
  tally: {}  // probably taken over by moderator
}

const playerActions = `games/${game}/playerActions/`;
const storeActions = `games/${game}/storeActions/`;

//TODOS
// do we want to delay daytime voting?
// night ends when time is up or all night players have completed their actions
// day ends when  majority vote has been reached or maybe also time is up


/* ------------       REDUCER     ------------------ */

const reducer = (state = initialState, action) => {

  const newState = Object.assign({}, state)

  switch(action.type) {

    case ADD_USER:
      newState.users[action.uid] = {
        name: action.name,
        alive: true,
        color: action.color,
        role: action.role
      }
      break;

    case RECIEVE_MESSAGE:
      let msg = {
        text: action.message,
        user: action.user,
      }
      newState[action.role] = [...newState[action.role], msg]
      break;

    case RECIEVE_VOTE:
      let vote = {
        killUser: action.vote,
        user: action.user
      }
      newState.votes = [...newState.votes, vote];
      break;

    case ADD_TALLY:
      newState.tally = tally;
      break;

    case KILLING:
      state.users[action.uid].alive = false;
      newState.users = Object.assign({}, state.users)
      break;

    case SWITCH_TIME:
      if (action.timeofday === 'daytime'){
        newState.day = true;
      } else if (action.timeofday === 'nighttime') {
        newState.day = false;
      }
      newState.votes = [];
      newState.villager = [];
      newState.seer = [];
      newState.priest = [];
      newState.wolf = [];
      break;

    case UPDATE_USER:
      // do we need to object assign everything here?
      if (action.name === newState.self.name) {
        newState.self.role = action.role;
      }
      newState.users[action.name].role = action.role;

      break;

    case SET_SELF:
      newState.self = action.self;
      break;

    default:
      break;
  }

  return newState;
}

/* -----------------    ACTIONS     ------------------ */

const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';
const RECIEVE_VOTE = 'RECIEVE_VOTE';
const SWITCH_TIME = 'SWITCH_TIME';
const GET_USERS = 'GET_USERS';


const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';
const SET_SELF = 'SET_SELF';

// const PEEKING = 'PEEKING';
const SAVING = 'SAVING';
const KILLING = 'KILLING';
const ADD_TALLY = 'ADD_TALLY';


/* ------------     ACTION CREATORS     ------------------ */
// export const recieveMessage = message => ({
//   type: RECIEVE_MESSAGE,
//   message
// })

// export const recieveVote = vote => ({
//   type: RECIEVE_VOTE, vote
// })

export const setSelf = self => ({
  type: SET_SELF, self
})

export const switchTime = timeofday => ({
  type: SWITCH_TIME, timeofday
})

export const getAllUsers = users => ({
  type: GET_USERS, users
})

export const firebaseUpdate = update => {
  return update;
}

export const killUser = user => ({
  type: KILLING, user
})

export const addTally = tally => ({
  type: ADD_TALLY, tally
})

/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => {
  return dispatch => {
    firebase.database().ref('/users/').once('value')
    .then(res => {
      dispatch(getAllUsers(res.val()))
     })
    .catch(console.error)
  }
}

// // when user joins a game they input a username. Users are stored by username in the db
// export const addUser = (username, role) => {
//   return dispatch => {
//     firebase.database().ref('users').push({
//       type: ADD_USER,
//       role,
//       alive,
//       won,
//       uid,
//       color,
//     })
//     .catch(console.error)
//   }
// }

// send Message to firebase
export const sendMessageAction = (user, message, role) => {
  return dispatch => {
    firebase.database().ref(playerActions).push({
      type: RECIEVE_MESSAGE,
      user: user,
      message: message,
      role: role,
    })
    .then(res => {
      // console.log('message sent to firebase')
    })
    .catch(err => console.error('Error sending message to firebase', err))
  }
}

// send votes to firebase
export const sendVoteAction = (user, vote) => {
  return dispatch => {
    firebase.database().ref(playerActions).push({
      type: RECIEVE_VOTE,
      user: user,
      vote: vote
    })
    .catch(err => console.error('Error getting the lastest votes from firebase', err))
  }
}

// dispatched after a majority vote is reached
export const sendSwitchTimeAction = (timeofday) => {
  return dispatch => {
    firebase.database().ref(playerActions).push({
    type: SWITCH_TIME,
    timeofday,
    })
    .catch(err => console.error('Error getting the lastest timeofday from firebase', err))
  }
}

// dispatched after a majority vote is reached
export const sendKillUserAction = (user) => {
  return dispatch => {
    firebase.database().ref(playerActions).push({
    type: KILLING,
    user
    })
    .catch(err => console.error('Error getting the lastest killUser from firebase', err))
  }
}

// dispatched if a majority vote is not reached
// might have to turn into a moderator message
export const sendAddTallyAction = (tally) => {
  return dispatch => {
    firebase.database().ref(playerActions).push({
    type: ADD_TALLY,
    tally,
    })
    .catch(err => console.error('Error getting the lastest addTally from firebase', err))
  }
}

// tallys votes. Kills user if majority is reached, otherwise tally is added to store
export const tallyVotes = () => {
  return (dispatch, getState) => {
    const {votes, users, day} = getState().game;
    const tally = {};
    votes.forEach(vote => {
      const killUser = vote.killUser;
      if (!tally[killUser]) {
        tally[killUser] = 0;
      }
      tally[killUser] += 1;
    })

    let maxVotes = 0;
    let maxUser;
    Object.keys(tally).forEach(key => {
      if (tally[key] > maxVotes) {
        maxUser = key;
        maxVotes = tally[key];
      }
    })
    const numOfPlayers = Object.keys(users).length;
    if(maxVotes > numOfPlayers / 2) {
      dispatch(sendKillUserAction(maxUser));
      dispatch(sendSwitchTimeAction(day ? 'nighttime' : 'daytime'))
    }
    else dispatch(sendAddTallyAction(tally));
  }
}

// helper function for assigning roles, for moderator use
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// for seers, should we call it scry?
export const sendPeekAction = (seerName, targetName) => {
  return (dispatch, getState) => {
    dispatch(sendMessageAction(seerName, `/peek ${targetName}`, 'seer'));
    const userRole = getState().game.users[targetName].role;
    const isWerewolf = (userRole === 'werewolf');
    const wolfMessage = `${targetName} definitely howls at the moon`;
    const notWolfMessage = `${targetName} wouldn't hurt a fly`;
    dispatch(sendMessageAction('moderator', (isWerewolf) ? wolfMessage : notWolfMessage, 'seer'));
  }
}

// Generic Action Listner, will recieve actions whenever firebase/actions updates
export const updateGameActions = () => {
  return (dispatch, getState) => {
    firebase.database().ref(`${storeActions}/public`).on('child_added', function(action){
        dispatch(firebaseUpdate(action.val()))
    })
    firebase.database().ref(`${storeActions}/${getState().game.self.uid}`).on('child_added', function(action){
        dispatch(firebaseUpdate(action.val()))
    })
  }
}
//After roles are assigned, if the player is a werewolf, then listen for werewolf store actions.
export const updateWolfActions = () => {
  return (dispatch, getState) => {
    if (getState().game.self.role === "werewolf") {
      firebase.database().ref(`${storeActions}/werewolves`).on('child_added', function(action){
        dispatch(firebaseUpdate(action.val()))
      })
    }
  }
}

/* ------------------  default export     ------------------ */

export default reducer;
