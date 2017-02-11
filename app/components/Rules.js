import React from 'react';
import { Link } from 'react-router';

const Rules = () => {
  return (
    <div className="rules">
      <div className="rules-container">
        <a name="rules-of-game"><h1 className="rules-header">The Rules of the Game</h1></a>
        <Link to="/rules#roles"><h3 className="rules-header">Go to Roles</h3></Link>
        <div className="rules-grid">
          <div className="rules-row">
            <div className="rules-col-4">
              <h2>Starting a New Game</h2>
            </div>
            <div className="rules-col-8">
              <p>To create a new game, go to <Link to="/newgame" style={{color: '#D6C967', textDecoration: 'none'}}>CREATE NEW GAME</Link> and enter your username and enter a name for the game. This starts a chat room where you can see who else is playing or who else wants to join the game. In order to start a game, you need at least five players, including the game leader who created the game.
              Each game has werewolves and villagers. Two of the villagers will have secret powers as the Seer or the Priest. The number of werewolves depends on the number of players, because they are set as a 1:2 ratio to the villagers. Each player should keep their role a secret from other players.</p>
            </div>
          </div>
          <div className="rules-row">
            <div className="rules-col-4">
              <h2>Gameplay</h2>
            </div>
            <div className="rules-col-8">
              <p>The game proceeds in alternating night and day rounds. It begins with nighttime.</p>
            <h3> The Night</h3>
            <p> At night, the werewolves chat with one another and choose one villager to kill. Each werewolf will vote for their victim by typing "/vote VictimName". The werewolves must unanimously agree on a single victim. There will be a limit on how long they can deliberate.</p>

            <p>Next, the priest selects someone they'd like to protect. The person chosen (which could be the priest himself) will survive if the werewolves had chosen to kill them. If a player gets selected by the werewolves, and then saved by the priest, the moderator will let the village know by announcing the news at the beginning of daytime.</p>

            <p>At the same time, the seer can ask if a particular player is a werewolf, and the moderator will answer.</p>

            <h3>The Day</h3>
            <p>At the beginning of each day, the moderator announces the username of the player who has been killed, or that nobody died that night. The player who is killed is out of the game, and they do not reveal their role to the surviving villagers. </p>

            <p>The living players in the village chat with one another and try to figure out which of their fellow villagers is a werewolf in disguise - and then vote to kill that player. There are no restrictions on speech. Any living player can say anything they want -- truth, misdirection, or a outright lie. Dead players may not speak at all. If an accused party wants to protest, they must do so before the vote goes through. Once a player is eliminated, night falls and the cycle repeats. </p>
            </div>
          </div>
          <div className="rules-row">
            <div className="rules-col-4">
              <h2>Winning</h2>
            </div>
            <div className="rules-col-8">
              <p>The game continues until the number of living werewolves is equal to the number of surviving villagers, or all werewolves are dead. If the former occurs, the werewolves win. If the latter happens, the villagers win.</p>
            </div>
          </div>
        </div>
        <a name="roles"><h1 className="rules-header">Roles</h1></a>
        <div className="rules-grid">
          <div className="rules-row">
            <div className="rules-col-4">
              <h2>The Villagers</h2>
            </div>
            <div className="rules-col-8">
              <p>The villagers' role is to try to figure out who the werewolves are. This requires the ability to sense when a player is lying. </p>
            </div>
          </div>
          <div className="rules-row">
            <div className="rules-col-4">
              <h2>The Werewolves</h2>
            </div>
            <div className="rules-col-8">
              <p>By night the werewolves discuss amongst themselves which villagers they'll slay next. By day the werewolves pose as regular villagers. They must convince the real villagers of their innocence.</p>
            </div>
          </div>
          <div className="rules-row">
            <div className="rules-col-4">
              <h2>The Seer</h2>
            </div>
            <div className="rules-col-8">
              <p>The seer is a villager who has the ability to ask the moderator whether or not a  player is a werewolf each night. The seer does this by typing "/scry PlayerName".</p>
            </div>
          </div>
          <div className="rules-row">
            <div className="rules-col-4">
              <h2>The Priest</h2>
            </div>
            <div className="rules-col-8">
              <p>The priest is a villager who can choose one player to save each night. The priest can choose to save him or herself. The player who is chosen cannot be killed that night. The priest saves a player by typing "/save PlayerName". </p>
            </div>
            <Link to="/rules#rules-of-game"><h3 className="rules-header">Back to top</h3></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rules;


