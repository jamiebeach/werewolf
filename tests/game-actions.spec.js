import {expect} from 'chai';
import {setPlayer, getAllUsers, removeUser, recieveGameId, recieveTakenName, selectVote, clearGame} from '../app/reducers/game';

describe('game action creators', () => {

    describe('setPlayer', () => {

        it('returns properly formatted action', () => {

            const newPlayer = {
              alive: true,
              joined: true,
              leader: false,
              name: "Jane",
              uid: "26UWpFOj4ugkCy9vh4MKD8vA8eR2",
              won: false
            };

            expect(setPlayer(newPlayer)).to.be.deep.equal({
                type: 'SET_PLAYER',
                player: newPlayer
            });

        });

    });

    describe('removeUser', () => {

        it('returns properly formatted action', () => {

            const name = 'Jane';

            expect(removeUser(name)).to.be.deep.equal({
                type: 'REMOVE_USER',
                name: name
            });

        });

    });

    describe('recieveGameId', () => {

        it('returns properly formatted action', () => {

            const gameId = "-Kcpk539YTQ7TRsjg2Ha";

            expect(recieveGameId(gameId)).to.be.deep.equal({
                type: 'RECIEVE_GAMEID',
                gameId: gameId
            });

        });

    });

    describe('recieveTakenName', () => {

        it('returns properly formatted action', () => {

            const takenName = "!";

            expect(recieveTakenName(takenName)).to.be.deep.equal({
                type: 'RECIEVE_TAKENNAME',
                takenName: takenName
            });

        });

    });

    describe('selectVote', () => {

        it('returns properly formatted action', () => {

            const target = "Cara";

            expect(selectVote(target)).to.be.deep.equal({
                type: 'SELECT_VOTE',
                target: target
            });

        });

    });

    describe('clearGame', () => {

        it('returns properly formatted action', () => {

            expect(clearGame()).to.be.deep.equal({
                type: 'CLEAR_GAME'
            });

        });

    });

});
