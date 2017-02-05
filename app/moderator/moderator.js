
/* -----------------    ACTIONS     ------------------ */

const RECIEVE_MESSAGE = 'RECIEVE_MESSAGE';
const RECIEVE_VOTE = 'RECIEVE_VOTE';
const START_GAME = 'START_GAME';
const LEADER_START = 'LEADER_START';
const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';

/* ----------------- CONSTANTS: SETTINGS ------------------ */

const colors =
[
  'darkred',
  'darkblue',
  'darkgreen',
  'grey',
  'purple',
  'orange'
];

// milliseconds for various setTimeouts
const timeToRead = 5000;  // 5000

const timeForNight = 7000; // 10000
const timeForDay = 10000; // 100,000 -> this is 1m40s

/* ----------------- THE MODERATOR ------------------ */

// the moderator class is the ultimate source of truth
// its props reflect the game state at every given point

// players send actions to "PlayerActions" on firebase
// the moderator listens to that key,
// (as the only person listening to all player events)
// logically adjusts the props, and responds to "StoreActions"

// players do NOT listen to "PlayerActions"
// players only listen to assigned channels on "StoreActions"

/* -------------- currently... --------------- */
// a new instance of the moderator class is invoked
// by the leader who initiates a game chat room

// the leader then commands "/ready"
// triggering the moderator's assignment of roles
// and the game loop

/* -------------- eventually... --------------- */
// the moderator is run on another server and
// the leader is not the one invoking the methods


export default class Moderator {
  // created when a leader creates a game

  constructor(gameName, leaderName, uid) {
    this.gameName = gameName;
    this.leaderId = uid;
    this.players = [];
    this.votes = [];
    this.day = true;
    this.seerId = '';
    this.priestId = '';
    this.didStart = false;
    this.didScry = false;
    this.didSave = false;
    this.chosen = '';
    this.winner = '';

    // listen to player actions in firebase
    firebase.database().ref(`games/${this.gameName}/playerActions/`)
    .on('child_added', function(action){
      const playerAction = action.val();
      switch (playerAction.type) {
        case RECIEVE_MESSAGE:
          // let msg = {
          //   text: action.message,
          //   user: action.user,
          // }
          //newState[action.role] = [...newState[action.role], msg]
          break;

        case RECIEVE_VOTE:
          // let vote = {
          //   killUser: action.vote,
          //   user: action.user
          // }
          //newState.votes = [...newState.votes, vote];
          break;

        case ADD_USER: // make this
          break;

        case LEADER_START: // make this
          break;

        case START_GAME: // make this
          break;

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
        let msg = 'You have already exhausted your mystical powers for tonight. Go to bed and try again tomorrow.'

        narrate(msg, sender.role, sender.uid, 'already scryed')
      } else {
        this.didScry = true;
        let werewolfStatus = this.players[seerAction.target].role === 'werewolf';
        let msg = werewolfStatus ? `${seerAction.target} definitely howls at the moon` : `${seerAction.target} wouldn't hurt a fly`

        narrate(msg, sender.role, sender.uid, 'scry results')
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
        let msg = 'You have already exhausted your holy powers for tonight. Go to bed and try again tomorrow.'

        narrate(msg, sender.role, sender.uid, 'already saved')

      } else {
        this.didSave = true;
        this.players[priestAction.target].immunity = true;

        let msg = `A divine shield surrounds ${priestAction.target}, protecting them from the werewolves for tonight.`

        narrate(msg, sender.role, sender.uid, 'saving')
      }
    }
  }

  handleMessage(playerAction) {

    firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(playerAction)//...
  }

  handleVote(playerAction) {
    let role = this.day ? 'villager' : 'wolf';

    if (this.players[playerAction.vote].alive){
      this.votes.push(playerAction);

      let channel = this.day ? 'public' : 'werewolves';
      let methodOfMurder = this.day ? 'lynch' : 'maul';

      let msg = `${playerAction.user} votes to ${methodOfMurder} ${playerAction.vote}`
      narrate(msg, role, null, `${role} voting`)
    }

    else {
      let msg = `${playerAction.vote} is already dead.`
      narrate(msg, role, this.players[playerAction.user].uid, role)
    }

  }

  tallyVotes() {
    const tally = {};
    Object.keys(this.players).forEach(name => {
      tally[name] = {};
    })

    this.votes.forEach(vote => {
      tally[vote.user][vote.vote] = true;
    })

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

    // const numOfPlayers = Object.keys(this.players).length;
    // we deleted the majority rules, but you might want to do that
    this.chosen = maxUser[Math.floor(Math.random()*maxUser.length)];
  }

  resolveNightEvents(){
    // should be called after night ends to take immmunity into account
    let chosen = this.players[this.chosen];
    let msg;

    if (chosen.immunity){
      msg = `Everyone wakes up and all is well within the village. But werewolves are still lurking in the darkness...`
    }
    else {
      chosen.alive = false;
      //send this as an action to the public store
      firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
        {
          type: UPDATE_USER,
          name: chosen.name,
          alive: false,
        })
        .catch(err => console.error('Error: moderator sending death message to firebase', err));

      msg = `Everyone wakes up and discovers that ${this.chosen} was eaten by werewolves last night. Avenge their death!`
    }

    narrate(msg, 'villager', null, 'morning')
    //resetting the night props
    chosen.immunity = false;
    this.chosen = null;
    this.didScry = false;
    this.didSave = false;
    this.votes = [];
  }

  nightActions() {
    narrate(`Everyone in the village goes to sleep.`, 'villager')
    // settimeout gives people a chance to read before night switch
      setTimeout(() => {
        this.day = false;
        firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
          {
            type: 'SWITCH_TIME',
            timeofday: 'nighttime'
          }
        )
        .catch(err => console.error('Error: moderator sending night to firebase', err));

        // send messages to special people
        let wmsg = `Werewolves, awaken.  Select a villager to kill, you must agree on a target`
        narrate(wmsg, 'wolf', 'werewolves', 'awaken wolves')

        let smsg = `Seer, awaken.  Select a villager to scry on.  You can only do this once a night.`
        narrate(smsg, 'seer', this.seerId, 'awaken seer')

        let pmsg = `Priest, awaken.  Select a villager to save.  You can only do this once a night.`
        narrate(pmsg, 'priest', this.priestId, 'awaken priest')

      }, timeToRead);

      setTimeout(() => {
        this.tallyVotes()
        this.dayActions()
      }, timeForNight)
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

    narrate(`The sun rises. A new day begins for the village.`, 'villager')
    this.resolveNightEvents();

    //werewolves may have won at this point
    this.checkWin();
    if (this.winner === 'werewolves'){
      let msg = `Werewolves have overrun your village and there is no hope for the innocent.`
      narrate(msg, 'villager', null, 'wolf win')
    }
    else {
      // settimeout for daytime discussions. votes tally as soon as day ends.
      setTimeout(() => {
        this.tallyVotes()
        // when votes finish, kill someone.
        let chosen = this.players[this.chosen];
        chosen.alive = false;

        let msg = `The villagers find ${this.chosen} extremely suspiscious and hang them at townsquare before sundown.`
        narrate(msg, 'villager', null, 'lynch')

        //send this as an action to the public store
        firebase.database().ref(`games/${this.gameName}/storeActions/public`).push(
        {
          type: UPDATE_USER,
          name: chosen.name,
          alive: false,
        })
        .catch(err => console.error('Error: moderator sending death message to firebase', err));

        this.checkWin();
        if (this.winner === 'werewolves'){
          msg = `The village chose to kill a fellow villager... Werewolves have overrun your village and there is no hope for the innocent.`
          narrate(msg, 'villager', null, 'wolf win')
        }
        else if (this.winner === 'villagers'){
          msg = `The last werewolf has been killed! You have exterminated all the werewolves from your village and can sleep peacefully now.`
          narrate(msg, 'villager', null, 'village win')
        } else {
          this.chosen = null;
          this.votes = [];

          this.nightActions();
        }
      }, timeForDay)
    }
  }

  handleLeaderStart() {
    if (!this.didStart) {
      // switch from array to object
      const obj = {};
      this.players.forEach(player => obj[player.name] = player);
      this.players = obj;

      // first night time is triggered
      this.nightActions();
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
      let msg = `You are a ${player.role}.  The leader will start the game when everyone is ready.`
      narrate(msg, 'villager', player.uid, 'role assign')
    })

    // tell leader to use slash command to start
    let msg = `Type '/ready' to begin.`
    narrate(msg, 'villager', this.leaderId, 'leader ready')
  }

  checkWin(){
    let werewolfCount = 0;
    let villagerCount = 0;

    Object.keys(this.players).forEach((player) => {
      if (this.players[player].role === 'werewolf' && this.players[player].alive){
        werewolfCount++;
      }
      if (this.players[player].role !== 'werewolf' && this.players[player].alive){
        villagerCount++;
      }
    })

    if (werewolfCount === 0) {
      this.winner = 'villagers';
    }
    else if (werewolfCount >= villagerCount){
      this.winner = 'werewolves';
    }
  }
}

/* ----------------- HELPER FUNCTIONS ------------------ */

// moderator narration function, takes in message text
// and sends RECIEVE_ACTION object to firebase
// typeof: message = string,
// role = role, in a string,
// personal = specific uid or 'werewolves' (leave null to send to everyone)
// error = 1-2 word summary of msg (leave null for generic error)
function narrate(message, role, personal, error){
  let ref = personal ? personal : 'public';

  firebase.database().ref(`games/${this.gameName}/storeActions/${ref}`)
  .push({
    type: RECIEVE_MESSAGE,
    name: 'moderator',
    message: `${message}`,
    role: `${role}`
  })
  .catch(err => console.error(`Error: moderator sending ${error} to firebase`, err))
}

// randomize a list functon, used for assigning roles
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
