import axios from 'axios';
import {browserHistory} from 'react-router';
import {setPlayer} from './game';

const game = 'game1';

const initialState = {
  user: null,
}

/* ------------       REDUCER     ------------------ */

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

/* -----------------    ACTIONS     ------------------ */

const AUTHENTICATED = 'AUTHENTICATED'
const CREATE_USER = 'CREATE_USER';


/* ------------     ACTION CREATORS     ------------------ */

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

/* ------------       DISPATCHERS     ------------------ */

// for anonymous login happens when user first lands on page
// firebase.auth().signInAnonymously()

export const anonLogin = () =>
  dispatch => {
    firebase.auth().signInAnonymously()
    .then(res => {
      const uid = res.uid;
      const player = {
        alive: true,
        won: false,
        uid: uid,
      }
      dispatch(setPlayer(player));
    })
    .catch(() => console.log("login failed"));

  }

// export const login = (email, password) =>
//   dispatch =>
//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then(() => browserHistory.push('/sphinx'))
//       .catch(() => console.log("login failed"));

// export const logout = () =>
//   dispatch =>
//     firebase.auth().signOut()
//     .then(() => browserHistory.push('/'))
//     .catch(() => console.log("logout failed"));

export const whoami = () =>
  dispatch =>
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          const player = {
            alive: true,
            won: false,
            uid: user.uid,
          }
          dispatch(authenticated({uid: user.uid}));
          dispatch(setPlayer(player));
        }
        else dispatch(anonLogin())
      },
      error => console.log(error))

// export const checkValidName = name => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid
//     console.log("uid = ", uid);
//     firebase.database().ref(`${game}/users/${name}`).once('value')
//     .then(res => {
//       if(res.val() === null) {
//         const player = {
//           alive: true,
//           won: false,
//           uid: uid,
//           //TODO add color somehow
//           color: null,
//         }
//         firebase.database().ref(`${game}/users/${name}`).set(player);
//         player.name = name;
//         dispatch(setPlayer(player));
//         dispatch(changeName(name));
//       }
//       else console.log("name is already in use")
//      })
//      .catch(console.error);
//   }
// }

// // this will overwrite any user's info, not just anon ones, need to fix later
// export const changeName = (name) => {
//   return dispatch => {
//     const user = firebase.auth().currentUser;
//     user.updateProfile({displayName: name})
//     .then(() => {
//       dispatch(authenticated({...user}));
//     })

//     .catch((error) => console.log(error))
//   }
// }




/* ------------------  default export     ------------------ */

export default reducer;
