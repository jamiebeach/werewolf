const initialState = {
  users: { 
    garity : {
      role: 'villager',
      alive: true,
      won: false,
      uid: 1,
      color: '#FFF',
      immunity: false,
    },
    gladys : {
      role: 'werewolf',
      alive: true,
      won: false,
      uid: 2,
      color: '#000',
      immunity: false,
    },
    jenny : {
      role: 'preist',
      alive: true,
      won: false,
      uid: 3,
      color: '#0EF',
      immunity: false,
    },
  },
  villager: [],
  seer: [],
  priest: [],
  wolf: [],
  votes: [{killUser: 'garity', user:'jenny'}, {killUser: 'garity', user:'gladys'}, {killUser: 'jenny', user:'garity'}],
  day: true,
}

//TODOS
// Majority votes
// Trigger timeofday toggle
// do we want to delay daytime voting?
// night ends when time is up or all night players have completed their actions
// day ends when  majority vote has been reached or maybe also time is up


/* ------------       REDUCER     ------------------ */

const reducer = (state = initialState, action) => {

  const newState = Object.assign({}, state)

  switch(action.type) {

    case GET_USERS:
      newState.users = action.users;
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
      newState.tally = {};
      newState.users[action.user].alive = false;
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
  }

  return newState;
}

/* -----------------    ACTIONS     ------------------ */

const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';
const RECIEVE_VOTE = 'RECIEVE_VOTE';
const SWITCH_TIME = 'SWITCH_TIME';
const GET_USERS = 'GET_USERS';


const ADD_USER = 'ADD_USER';

const PEEKING = 'PEEKING';
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

// when user joins a game they input a username. Users are stored by username in the db
export const addUser = (username, role) => {
  return dispatch => {
    firebase.database().ref('users').push({
      role,
      alive,
      won,
      uid,
      color,
    })
    .catch(console.error)
  }
}

// send Message to firebase
export const sendMessageAction = (user, message, role) => {
  return dispatch => {
    firebase.database().ref('actions').push({
      type: RECIEVE_MESSAGE,
      user: user,
      message: message,
      role: role,
    })
    .then(res => console.log('message sent to firebase'))
    .catch(err => console.error('Error sending message to firebase', err))
  }
}

// send votes to firebase
export const sendVoteAction = (user, vote) => {
  return dispatch => {
    firebase.database().ref('actions').push({
      type: RECIEVE_VOTE,
      user: user,
      vote: vote
    })
    .catch(err => console.error('Error getting the lastest votes from firebase', err))
  }
}

export const sendSwitchTimeAction = (timeofday) => {
  return dispatch => {
    firebase.database().ref('actions').push({
    type: SWITCH_TIME, 
    timeofday,
    })
    .catch(err => console.error('Error getting the lastest timeofday from firebase', err))
  }
}

export const sendKillUserAction = (user) => {
  return dispatch => {
    firebase.database().ref('actions').push({
    type: KILLING, 
    user
    })
    .catch(err => console.error('Error getting the lastest killUser from firebase', err))
  }
}

export const sendAddTallyAction = (tally) => {
  return dispatch => {
    firebase.database().ref('actions').push({
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

// Generic Action Listner, will recieve actions whenever firebase/actions updates
export const updateGameActions = () => {
  return dispatch => {
    firebase.database().ref('/actions/').on('child_added', function(action){
        dispatch(firebaseUpdate(action.val()))
    })
  }
}

/* ------------------  default export     ------------------ */

export default reducer;
