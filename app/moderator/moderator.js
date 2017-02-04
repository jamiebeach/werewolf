const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';
const RECIEVE_VOTE = 'RECIEVE_VOTE';
const START_GAME = 'START_GAME';
const LEADER_START = 'LEADER_START';
const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';
const colors = ['darkred', 'darkblue', 'darkgreen', 'grey', 'purple', 'orange'];


export default class Moderator {
  // created when a leader creates a game

  // should I use leader id instead
  constructor(gameName, leaderName, uid) {
    this.gameName = gameName;
    this.leaderId = uid;
    this.players = [];
    this.day = true;
    this.seerId;
    this.priestId;
    this.didStart = false;
    // listen to player actions in firebase
     firebase.database().ref(`games/${this.gameName}/playerActions/`).on('child_added', function(action){
        const playerAction = action.val();
        switch(playerAction.type) {
          case RECIEVE_MESSAGE:
            let msg = {
              text: action.message,
              user: action.user,
            }
            //newState[action.role] = [...newState[action.role], msg]
            break;

          case RECIEVE_VOTE:
            let vote = {
              killUser: action.vote,
              user: action.user
            }
            //newState.votes = [...newState.votes, vote];
            break;

          case ADD_USER: // make this
            break;

          case LEADER_START: // make this
            break;

          case START_GAME: // make this
            break;

          // case SWITCH_TIME:
          //   if (action.timeofday === 'daytime'){
          //     newState.day = true;
          //   } else if (action.timeofday === 'nighttime') {
          //     newState.day = false;
          //   }
          //   newState.votes = [];
          //   newState.villager = [];
          //   newState.seer = [];
          //   newState.priest = [];
          //   newState.wolf = [];
          //   break;

          // case UPDATE_USER:
          //   // do we need to object assign everything here?
          //   if (action.name === newState.self.name) newState.self.role = action.role;
          //   newState.users[action.name].role = action.role;
          //   break;

          default:
            break;

        }
    })
  }

  handleJoin(playerAction) {
    const color = colors[this.players.length];
    this.players.push(
      {
        name: playerAction.name,
        alive: true,
        uid: playerAction.uid,
        immunity: false,
        color: color,
        ready: false
      }
    );

    firebase.database().ref(`games/${this.gameName}/storeActions/public`).push({
      type: ADD_USER,
      name: playerAction.name,
      alive: true,
      color: color,
      uid: playerAction.uid,
      role: 'villager'
    })
    .then(res => {
      console.log('moderator adduser', res);
    })
    .catch(err => console.error('Error sending adduser to storeactions in firebase', err))
  }

  handleMessage(playerAction) {
    //seer
    //wolf
    //priest
    //village

    firebase.database().ref(`games/${this.gameName}/storeActions/public`).push({
      type: RECIEVE_MESSAGE,
      user: user,
      message: message,
      role: role,
    })//...
  }

  handleVote(playerAction) {

  }

  nightAction() {
    firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
      {
        type: RECIEVE_MESSAGE,
        name: 'moderator',
        message: `Everyone in the village goes to sleep.`,
        role: 'villager'
      })
      .catch(err => console.error('Error: moderator sending sleep message to firebase', err));

      setTimeout(()=> {
        this.day = false;
        firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
          {
            type: 'SWITCH_TIME',
            timeofday: 'nighttime'
          }
        )
        .catch(err => console.error('Error: moderator sending night to firebase', err));

        // send messages to special people
        firebase.database().ref(`games/${this.gameName}/storeActions/werewolves`).push(
          {
            type: RECIEVE_MESSAGE,
            name: 'moderator',
            message: `The werewolves wake up.  Select a villager to kill, you must agree on a target`,
            role: 'wolf'
          })
          .catch(err => console.error('Error: moderator sending wolf message to firebase', err));

          firebase.database().ref(`games/${this.gameName}/storeActions/${this.seerId}`).push(
          {
            type: RECIEVE_MESSAGE,
            name: 'moderator',
            message: `The seer wakes up.  Select a villager to scry on.  You can only do this once a night.`,
            role: 'seer'
          })
          .catch(err => console.error('Error: moderator sending wolf message to firebase', err));

          firebase.database().ref(`games/${this.gameName}/storeActions/${this.priestId}`).push(
          {
            type: RECIEVE_MESSAGE,
            name: 'moderator',
            message: `The priest wakes up.  Select a villager to save.  You can only do this once a night.`,
            role: 'priest'
          })
          .catch(err => console.error('Error: moderator sending wolf message to firebase', err));

      }, 2000);

    // send starting narration messages

  }

  handleLeaderStart() {
    if (!this.didStart) {
      // switch from array to object
      const obj = {};
      this.players.forEach(player => obj[player.name] = player);
      this.players = obj;

      this.nightAction();
      this.didStart = true;
    }
  }

  handleStart() {
    const length = this.players.length;
    let numWerewolves = Math.floor(length / 3);
    let roles = ['seer', 'priest'];
    while (numWerewolves--) roles.push('werewolf');
    while (roles.length < length) roles.push('villager');
    roles = shuffle(roles);

    this.players.forEach((player, index) => {
      player.role = roles[index];
      if (player.role === 'seer') this.seerId = player.uid;
      if (player.role === 'seer') this.seerId = player.uid;
    });

    const werewolves = this.players.filter(player => (player.role === 'werewolf'));
    const wwToFirebase = werewolves.map(player => (
      {
        type: UPDATE_USER,
        name: player.name,
        role: player.role
      }
    ));
    const others = this.players.filter(player => (player.role !== 'werewolf'));

    // send werewolf roles to all werewolves
    for (let i = 0; i < werewolves.length; i++) {
      for (let j = 0; j < werewolves.length; j++) {
        firebase.database().ref(`games/${this.gameName}/storeActions/${werewolves[i].uid}`).push(wwToFirebase[j])
        .catch(err => console.error('Error: moderator sending role to firebase', err))
      }
    }

    // send one role to everyone else
    others.forEach((player, index) => {
      firebase.database().ref(`games/${this.gameName}/storeActions/${player.uid}`).push({
        type: UPDATE_USER,
        name: player.name,
        role: player.role
      })
      .catch(err => console.error('Error: moderator sending role to firebase', err))
    })

    // send messages containing roles to everyone
    this.players.forEach((player, index) => {
      firebase.database().ref(`games/${this.gameName}/storeActions/${player.uid}`).push({
        type: RECIEVE_MESSAGE,
        name: 'moderator',
        message: `You are a ${player.role}.  The leader will start the game when everyone is ready.`,
        role: 'villager'
      })
      .catch(err => console.error('Error: moderator sending message role to firebase', err))
    })

    firebase.database().ref(`games/${this.gameName}/storeActions/${this.leaderId}`).push({
        type: RECIEVE_MESSAGE,
        name: 'moderator',
        message: `Type '/ready' to begin.`,
        role: 'villager'
      })
      .catch(err => console.error('Error: moderator sending message role to firebase', err))
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
