import { expect, assert } from 'chai';
import { app, chageKeyboardColour, letterInGuessWord, words, randomWord, checkPlayer } from '../server';
import chaiHttp  from 'chai-http';
import chai from 'chai';

const lettercolor = 'white';
const Wordlecolour = 'beige'
const letters = [
    {letter: 'Q', colour: lettercolor}, {letter: 'W', colour: lettercolor}, {letter: 'E', colour: lettercolor}, {letter: 'R', colour: lettercolor}, {letter: 'T', colour: lettercolor}, {letter: 'Y', colour: lettercolor}, {letter: 'U', colour: lettercolor}, {letter: 'I', colour: lettercolor}, {letter: 'O', colour: lettercolor}, {letter: 'P', colour: lettercolor},
    {letter: 'A', colour: lettercolor}, {letter: 'S', colour: lettercolor}, {letter: 'D', colour: lettercolor}, {letter: 'F', colour: lettercolor}, {letter: 'G', colour: lettercolor}, {letter: 'H', colour: lettercolor}, {letter: 'J', colour: lettercolor}, {letter: 'K', colour: lettercolor}, {letter: 'L', colour: lettercolor},
    {letter: 'Z', colour: lettercolor}, {letter: 'X', colour: lettercolor}, {letter: 'C', colour: lettercolor}, {letter: 'V', colour: lettercolor}, {letter: 'B', colour: lettercolor}, {letter: 'N', colour: lettercolor}, {letter: 'M', colour: lettercolor}
  ];
const word = [{letter : '', colour : Wordlecolour}];
for (let i = 1; i < 25; i++) {

    word.push({letter : '', colour: Wordlecolour});
}
const index = 0;
const fiveLettersCorrect = 0;


describe('randomWord function', () => {

    it('Random word is in the guessWord list', () => {

        expect(words).to.include(randomWord());
        expect(words).to.include(randomWord());
        expect(words).to.include(randomWord());
        expect(words).to.include(randomWord());
        expect(words).to.include(randomWord());
    });
});
describe('chageKeyboardColour function', () => {

    it('Colours have changed', () => {
        chageKeyboardColour(letters, letters[0].letter, 'gray');
        expect(letters[0].colour).equal('gray');
        chageKeyboardColour(letters, letters[1].letter, 'orange');
        expect(letters[1].colour).equal('orange');
        chageKeyboardColour(letters, letters[2].letter, 'gray');
        expect(letters[2].colour).equal('gray');
        chageKeyboardColour(letters, letters[3].letter, 'green');
        expect(letters[3].colour).equal('green');
        chageKeyboardColour(letters, letters[4].letter, 'gray');
        expect(letters[4].colour).equal('gray');
        chageKeyboardColour(letters, letters[5].letter, 'green');
        expect(letters[5].colour).equal('green');
        chageKeyboardColour(letters, letters[6].letter, 'orange');
        expect(letters[6].colour).equal('orange');
    });
    it('Gray can turn to Orange', () => {

        expect(letters[0].colour).equal('gray');
        chageKeyboardColour(letters, letters[0].letter, 'orange');
        expect(letters[0].colour).not.equal('gray');
        expect(letters[0].colour).equal('orange');
    });
    it('Gray can turn to Green', () => {

        expect(letters[2].colour).equal('gray');
        chageKeyboardColour(letters, letters[2].letter, 'orange');
        expect(letters[2].colour).not.equal('gray');
        expect(letters[2].colour).equal('orange');
    });
    it('Orange can turn to Green', () => {

        expect(letters[0].colour).equal('orange');
        chageKeyboardColour(letters, letters[0].letter, 'green');
        expect(letters[0].colour).not.equal('orange');
        expect(letters[0].colour).equal('green');
    });
    it('Green can not turn back to Orange', () => {

        expect(letters[0].colour).equal('green');
        chageKeyboardColour(letters, letters[0].letter, 'orange');
        expect(letters[0].colour).not.equal('orange');
        expect(letters[0].colour).equal('green');
    });
    it('Orange can not turn back to Gray', () => {

        expect(letters[2].colour).equal('orange');
        chageKeyboardColour(letters, letters[2].letter, 'gray');
        expect(letters[2].colour).not.equal('gray');
        expect(letters[2].colour).equal('orange');
    });
});
describe("letterInGuessWord function", () => {

    const guessWord = 'RAVEN';

    it('Found the correct letter in the guess word', () => {

        expect(letterInGuessWord(guessWord, 'N')).equal(true);
        expect(letterInGuessWord(guessWord, 'V')).equal(true);
        expect(letterInGuessWord(guessWord, 'R')).equal(true);
        expect(letterInGuessWord(guessWord, 'A')).equal(true);
        expect(letterInGuessWord(guessWord, 'E')).equal(true);
    });
    it('Could not find the wrong letter in the word', () => {

        expect(letterInGuessWord(guessWord, 'Q')).equal(false);
        expect(letterInGuessWord(guessWord, 'P')).equal(false);
        expect(letterInGuessWord(guessWord, 'D')).equal(false);
    });
});
describe("checkPlayer function", () => {

    word[0].letter = 'R';
    word[1].letter = 'A';
    word[2].letter = 'V';
    word[3].letter = 'M';
    word[4].letter = 'E';

    it("Should return 3 letters correct", () => {

        expect(checkPlayer(4, word, 'RAVEN', letters, 0)).equal(3);
        expect(word[0].colour).equal("green");
        expect(word[3].colour).equal('gray');
        expect(word[4].colour).equal('orange');
    })
    it("five letters should be correct", () => {

        word[3].letter = 'E';
        word[4].letter = 'N';
        expect(checkPlayer(4, word, 'RAVEN', letters, 0)).equal(5);
        expect(word[0].colour).equal("green");
        expect(word[1].colour).equal("green");
        expect(word[2].colour).equal("green");
        expect(word[3].colour).equal("green");
        expect(word[4].colour).equal("green");
    });
});

chai.use(chaiHttp);
describe("E2E Test", () => {

    const user = "newUser";

    it('Simple connection test', async () => {

        chai.request(app)
            .get('/')
            .end((err, res) => {

                // tslint:disable-next-line:no-unused-expression
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Hello World!");
            });
    });
    it('Sending the user name to the server', async () => {
        chai.request(app)
            .post("/")
            .send({userData : user})
            .end((err, res) => {

                // tslint:disable-next-line:no-unused-expression
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.userData).to.equal(user);
            })
    });
    it('Word Check test', async () => {

        chai.request(app)
        .post('/wordCheck')
        .send({word, letters, index, fiveLettersCorrect, user})
        .end((err, res) => {

            // tslint:disable-next-line:no-unused-expression
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.notDeepEqual(res.body.words, word);
            assert.notDeepEqual(res.body.letters, letters);
        })
    });
    it('The game is active even when the user that was sent is undefined', async () => {
        const noUser = undefined;
        chai.request(app)
        .post('/wordCheck')
        .send({word, letters, index, fiveLettersCorrect, noUser})
        .end((err, res) => {

            // tslint:disable-next-line:no-unused-expression
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.notDeepEqual(res.body.words, word);
            assert.notDeepEqual(res.body.letters, letters);
        })
    })
})

