const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';
const RECIEVE_VOTE = 'RECIEVE_VOTE';
const START_GAME = 'START_GAME';
const LEADER_START = 'LEADER_START';
const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';
const colors = ['darkred', 'darkblue', 'darkgreen', 'grey', 'purple', 'orange'];

const timeToRead = 5000;  //5000
const timeForNight = 7000; //10000
const timeForDay = 10; //this is currently 1m40s


export default class Moderator {
  // created when a leader creates a game

  // should I use leader id instead
  constructor(gameName, leaderName, uid) {
    this.gameName = gameName;
    this.leaderId = uid;
    this.players = [];
    this.votes = [];
    this.day = true;
    this.seerId;
    this.priestId;
    this.didStart = false;
    this.didScry = false;
    this.didSave = false;
    this.chosen = '';
    this.winner = '';
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

  handleScry(seerAction) {
    const sender = this.players[seerAction.user];

    if (seerAction.role === 'seer' && sender.role === 'seer' && !this.day) {

      firebase.database().ref(`games/${this.gameName}/storeActions/${sender.uid}`).push({
          type: RECIEVE_MESSAGE,
          user: sender.name,
          message: `/peek ${seerAction.target}`,
          role: sender.role,
        })

      if (this.didScry) {
        firebase.database().ref(`games/${this.gameName}/storeActions/${sender.uid}`).push({
          type: RECIEVE_MESSAGE,
          user: 'moderator',
          message: 'You have already exhausted your mystical powers for tonight. Go to bed and try again tomorrow.',
          role: sender.role,
        })

      } else {
        let werewolfStatus = this.players[seerAction.target].role === 'werewolf';
        this.didScry = true;

        firebase.database().ref(`games/${this.gameName}/storeActions/${sender.uid}`).push({
          type: RECIEVE_MESSAGE,
          user: 'moderator',
          message: werewolfStatus ? `${seerAction.target} definitely howls at the moon` : `${seerAction.target} wouldn't hurt a fly`,
          role: sender.role,
        })
      }
    }
  }

  handleSave(priestAction) {
    const sender = this.players[priestAction.user];

    if (priestAction.role === 'priest' && sender.role === 'priest' && !this.day) {

      firebase.database().ref(`games/${this.gameName}/storeActions/${sender.uid}`).push({
          type: RECIEVE_MESSAGE,
          user: sender.name,
          message: `/save ${priestAction.target}`,
          role: sender.role,
        })

      if (this.didSave) {
        firebase.database().ref(`games/${this.gameName}/storeActions/${sender.uid}`).push({
          type: RECIEVE_MESSAGE,
          user: 'moderator',
          message: 'You have already exhausted your holy powers for tonight. Go to bed and try again tomorrow.',
          role: sender.role,
        })

      } else {
        this.didSave = true;
        this.players[priestAction.target].immunity = true;

        firebase.database().ref(`games/${this.gameName}/storeActions/${sender.uid}`).push({
          type: RECIEVE_MESSAGE,
          user: 'moderator',
          message: `A divine shield surrounds ${priestAction.target}, protecting them from the werewolves for tonight.`,
          role: sender.role,
        })
      }
    }
  }

  handleMessage(playerAction) {

    firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(playerAction)//...
  }

  handleVote(playerAction) {
    this.votes.push(playerAction);

    let channel = this.day ? 'public' : 'werewolves';
    let methodOfMurder = this.day ? 'lynch' : 'maul';
    let role = this.day ? 'villager' : 'wolf';

    firebase.database().ref(`games/${this.gameName}/storeActions/${channel}`).push({
      type: RECIEVE_MESSAGE,
      user: 'moderator',
      message: `${playerAction.user} votes to ${methodOfMurder} ${playerAction.vote}`,
      role,
    })
  }

  tallyVotes() {
    const tally = {};
    Object.keys(this.players).forEach(name => {
      tally[name] = {};
    })

    this.votes.forEach(vote => {
      tally[vote.user][vote.vote] = true;
    })

    console.log('tally ' , tally);

    const voteCount = {};
    Object.keys(tally).forEach(voter => {
      Object.keys(tally[voter]).forEach(vote => {
        if (!voteCount[vote]) {
          voteCount[vote] = 0;
        }
        voteCount[vote]++;
      })
    })

    let maxVotes = 0;
    let maxUser = [];
    Object.keys(voteCount).forEach(key => {
      if (voteCount[key] > maxVotes) {
        maxUser = [key];
        maxVotes = voteCount[key];
      }
      else if (voteCount[key] === maxVotes) {
        maxUser.push(key);
      }
    })

    console.log('voteCount ', voteCount);
    console.log('maxUser ', maxUser);

    // const numOfPlayers = Object.keys(this.players).length;
    // we deleted the majority rules, but you might want to do that
    this.chosen = maxUser[Math.floor(Math.random()*maxUser.length)];
  }

  resolveNightEvents(){
    // player is th username
    // should be called after night ends to take immmunity into account

    let chosen = this.players[this.chosen];
    if (chosen.immunity){
      firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
      {
        type: RECIEVE_MESSAGE,
        name: 'moderator',
        message: `Everyone wakes up and all is well within the village. But werewolves are still lurking in the darkness...`,
        role: 'villager'
      })
      .catch(err => console.error('Error: moderator sending morning message to firebase', err));
    }
    else {
      chosen.alive = false;
      //send this as an action to the public store
      firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
      {
        type: RECIEVE_MESSAGE,
        name: 'moderator',
        message: `Everyone wakes up and discovers that ${this.chosen} was eaten by werewolves last night. Avenge their death!`,
        role: 'villager'
      })
      .catch(err => console.error('Error: moderator sending morning message to firebase', err));
    }

    //resetting the night props
    chosen.immunity = false;
    this.didScry = false;
    this.didSave = false;
    this.votes = [];
  }

  nightActions() {
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

      }, timeToRead);

      setTimeout(() => {
        this.tallyVotes()
        this.dayActions()
      }, timeForNight)

    // send starting narration messages
  }

  dayActions() {
    this.day = true;
    firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
      {
        type: 'SWITCH_TIME',
        timeofday: 'daytime'
      }
    )
    .catch(err => console.error('Error: moderator sending day to firebase', err));

    firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
      {
        type: RECIEVE_MESSAGE,
        name: 'moderator',
        message: `The sun rises. A new day begins for the village.`,
        role: 'villager'
      })
      .catch(err => console.error('Error: moderator sending sunrise message to firebase', err));

    this.resolveNightEvents();

    //werewolves may have won at this point
    this.checkWin();
    if (this.winner){
      firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
      {
        type: RECIEVE_MESSAGE,
        name: 'moderator',
        message: `Werewolves have overrun your village and there is no hope for the innocent.`,
        role: 'villager'
      })
      .catch(err => console.error('Error: moderator sending wolf win message to firebase', err));
    }
    else {
      setTimeout(() => {
        this.tallyVotes()
        this.nightActions()
      }, timeForDay)
    }
  }

  handleLeaderStart() {
    if (!this.didStart) {
      // switch from array to object
      const obj = {};
      this.players.forEach(player => obj[player.name] = player);
      this.players = obj;

      this.nightActions();
      this.didStart = true;
    }
  }

  // roles have not been shuffled for tesing purposes
  handleStart() {
    const length = this.players.length;
    let numWerewolves = Math.floor(length / 3);
    let roles = ['seer', 'priest'];
    while (numWerewolves--) roles.push('werewolf');
    while (roles.length < length) roles.push('villager');
    // roles = shuffle(roles);

    this.players.forEach((player, index) => {
      player.role = roles[index];
      if (player.role === 'seer') this.seerId = player.uid;
      if (player.role === 'priest') this.priestId = player.uid;
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

  checkWin(){
    let werewolfCount = 0;
    let villagerCount = 0;

    Object.keys(this.players).forEach((player) => {

      // console.log(player)

      if (this.players[player].role === 'werewolf' && this.players[player].alive){
        werewolfCount++;
      }
      if (this.players[player].role !== 'werewolf' && this.players[player].alive){
        villagerCount++;
      }
    })

    console.log('wolf count for the wincheck ', werewolfCount)
    console.log('villager count for the win check', villagerCount)

    if (werewolfCount === 0) {
      this.winner = 'villagers';
    }
    else if (werewolfCount >= villagerCount){
      this.winner = 'werewolves';
    }
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
