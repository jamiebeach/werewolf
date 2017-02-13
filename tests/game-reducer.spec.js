import {expect} from 'chai';
import {createStore} from 'redux';
import reducer from '../app/reducers/game';

describe('game reducer', () => {

    let testStore;
    beforeEach('Create testing store', () => {
        testStore = createStore(reducer);
    });

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal({
          games: [],
          gameId: '',
          takenNames: ['moderator'],
          gameInProgress: false,
          player: {},
          users: {},
          day: true,
          messages: [],
          vote: {},
          voteTarget: '',
          winner:'',
          backgroundImage: 'day container'
        });
    });

    describe('RECIEVE_TAKENNAME', () => {

        it('sets the takenNames correctly', () => {
            testStore.dispatch({
              type: 'RECIEVE_TAKENNAME',
              takenName: '!'
            });
            const newState = testStore.getState();
            expect(newState.takenNames).to.be.deep.equal(['moderator']);
        });

    });

    describe('FETCH_GAME', () => {

        it('gets games correctly', () => {

            const id = "-KciyRKRn04POdHVsRE8";
            const name = "testgame";

            testStore.dispatch({
              type: 'FETCH_GAME',
              id: id,
              name: name
            });

            const newState = testStore.getState();

            expect(newState.games).to.be.deep.equal([{
              id: id,
              name: name
            }]);

        });

    });

    describe('RECIEVE_GAMEID', () => {

        it('sets gameId correctly', () => {

            const gameId = "-KciyRKRn04POdHVsRE9";

            testStore.dispatch({
              type: 'RECIEVE_GAMEID',
              gameId: gameId
            });

            const newState = testStore.getState();

            expect(newState.gameId).to.be.deep.equal(gameId);

        });

    });

    describe('GAME_LOOPING', () => {

        it('sets gameInProgress correctly', () => {

            testStore.dispatch({
              type: 'GAME_LOOPING'
            });

            const newState = testStore.getState();

            expect(newState.gameInProgress).to.be.deep.equal(true);

        });

    });

    describe('SET_PLAYER', () => {

        it('sets player correctly', () => {

            const player = {
              alive: true,
              joined: true,
              leader: false,
              name: "Harry",
              uid: "26UWpFOj4ugkCy9vh4MKD8vA8eR4",
              won: false
            };


            testStore.dispatch({
              type: 'SET_PLAYER',
              player: player
            });

            const newState = testStore.getState();

            expect(newState.player).to.be.deep.equal(player);

        });

    });

    describe('RECIEVE_USER', () => {

        it('sets users correctly', () => {

            testStore.dispatch({
              type: 'RECIEVE_USER',
              name: 'William',
              uid: '26UWpFOj4ugkCy9vh4MKD8vA8fR',
              color: 'blue',
              avatar: 'f13',
              role: 'villager'
            });

            const newState = testStore.getState();

            expect(newState.users).to.be.deep.equal({William: {
                name: "William",
                uid: '26UWpFOj4ugkCy9vh4MKD8vA8fR',
                color: 'blue',
                avatar: 'f13',
                role: 'villager',
                alive: true
            }});

        });

    });

    describe('UPDATE_WINNER', () => {

        it('sets winner and backgroundImage correctly', () => {

            testStore.dispatch({
              type: 'UPDATE_WINNER',
              winner: 'villagers'
            });

            const newState = testStore.getState();

            expect(newState.winner).to.be.deep.equal('villagers');

            expect(newState.backgroundImage).to.be.deep.equal('day container villagers-victory');


        });

    });

    describe('CLEAR_GAME', () => {

        it('sets winner and backgroundImage correctly', () => {

            testStore.dispatch({
              type: 'CLEAR_GAME'
            });

            const newState = testStore.getState();

            expect(newState.gameId).to.be.deep.equal('');

            expect(newState.takenNames).to.be.deep.equal(['moderator']);

            expect(newState.gameInProgress).to.be.deep.equal(false);

            expect(newState.users).to.be.deep.equal({});

            expect(newState.day).to.be.deep.equal(true);

            expect(newState.messages).to.be.deep.equal([]);

            expect(newState.vote).to.be.deep.equal({});

            expect(newState.voteTarget).to.be.deep.equal('');

            expect(newState.winner).to.be.deep.equal('');

            expect(newState.backgroundImage).to.be.deep.equal('day container');

        });

    });
});