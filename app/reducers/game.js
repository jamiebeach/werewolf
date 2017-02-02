


// const initialState = {
//   allUsers: [],
// }
/* ------------       REDUCER     ------------------ */

const reducer = (state = {}, action) => {

  const newState = Object.assign({}, state)

  switch(action.type) {

    case GET_USERS:
      newState.users = action.users;
      break;

    case SEND_MESSAGE:
      newState.messages = [...newState.messages, action.message];
      break;

    case SEND_VOTE:
      newState.votes = [...newState.votes, action.votes];
      break;

    // case KILLING:
    //   newState.players

    //   break;

    case SWITCH_TIME:
      newState.day = action.timeofday;
      newState.votes = [];
      break;

    // case NIGHTTIME:
    //   newState.day = 'false';
    //   newState.votes = [];
    //   break;

  }

  return newState;
}

/* -----------------    ACTIONS     ------------------ */

const SEND_MESSAGE = 'SEND_MESSAGE';
const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';

const SEND_VOTE = 'SEND_VOTE';
const RECIEVE_VOTE = 'RECIEVE_VOTE';

const KILLING = 'KILLING';

const SWITCH_TIME = 'SWITCH_TIME';

const GET_USERS = 'GET_USERS';

/*
const PEEKING = 'PEEKING';
const SAVING = 'SAVING';
const DAYTIME = 'DAYTIME';
const NIGHTTIME = 'NIGHTTIME';
*/


/* ------------     ACTION CREATORS     ------------------ */
export const sendMessage = message => ({
  type: SEND_MESSAGE, message
})

export const sendVote = vote => ({
  type: SEND_VOTE, vote
})

export const switchTime = timeofday => ({
  type: SWITCH_TIME, timeofday
})

export const getAllUsers = users => ({
  type: GET_USERS, users
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

export const sendMessageAction = (user, message, time) => {
  return dispatch => {
    firebase.database().ref('/actions/').set({
      type: RECIEVE_MESSAGE,
      user: user,
      message: message,
      time: time
    })
    .then(res => console.log('message sent to firebase'))
    .catch(err => console.error(`Creating user: ${newUser} unsuccesful`, err))
  }
}




export const updateGameActions = () => {
  return dispatch => {
    firebase.database().ref('/actions/').on('value', function(action){
      // have generic function that will send approp thing to the reducer
      console.log(action)

    })


  }
}



/* ------------------  default export     ------------------ */

export default reducer;
