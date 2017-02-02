const initialState = {
  users: {},
  messages: [],
  votes: [],
  day: true,
}

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
        time: action.time
      }
      newState.messages = [...newState.messages, msg]
      break;

    case RECIEVE_VOTE:
      let vote = {
        killUser: action.vote,
        user: action.user
      }
      newState.votes = [...newState.votes, vote];
      break;

    // case KILLING:
    //   newState.players
    //   break;

    case SWITCH_TIME:
      if (action.timeofday === 'daytime'){
        newState.day = true;
      } else if (action.timeofday === 'nighttime') {
        newState.day = false;
      }
      newState.votes = [];
      break;
  }

  return newState;
}

/* -----------------    ACTIONS     ------------------ */

const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';
const RECIEVE_VOTE = 'RECIEVE_VOTE';
const SWITCH_TIME = 'SWITCH_TIME';
const GET_USERS = 'GET_USERS';

/*
const PEEKING = 'PEEKING';
const SAVING = 'SAVING';
// const KILLING = 'KILLING';


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

export const sendMessageAction = (user, message, time) => {
  return dispatch => {
    firebase.database().ref(`/actions/${time}`).set({
      type: RECIEVE_MESSAGE,
      user: user,
      message: message,
      time: time
    })
    .then(res => console.log('message sent to firebase'))
    .catch(err => console.error(`Creating user: ${newUser} unsuccesful`, err))
  }
}

export const sendVoteAction = (user, vote, time) => {
  return dispatch => {
    firebase.database().ref(`/actions/${time}`).set({
      type: RECIEVE_VOTE,
      user: user,
      vote: vote
    })
    .catch(err => console.error('Error getting the lastest votes from firebase', err))
  }
}

export const updateGameActions = () => {
  return dispatch => {
    firebase.database().ref('/actions/').on('child_added', function(action){
      dispatch(firebaseUpdate(action.val()))
    })
  }
}

/* ------------------  default export     ------------------ */

export default reducer;
