import express from 'express';
import cors from 'cors';
export const app = express();
const port = 3333;
app.use(cors({origin: 'http://localhost:5173'}));
export const words = ['SNAKE', 'RAVEN', 'ZEBRA', 'MOUSE', 'SHEEP',
              'WHALE', 'SLOTH', 'VIPER', 'GECKO', 'SKINK',
              'RANID', 'SIREN', 'GALAH', 'RATEL', 'JUNCO',
              'EAGLE', 'TROUT', 'SPRAT', 'GRUNT', 'MIDGE',
              'ROACH', 'MUSCA', 'ROBIN', 'SNAIL', 'CAMEL'];

const map = new Map<string, string>();
type wordType = {letter: string; colour: string;}[];
type lettersType = {letter: string; colour: string;}[]

app.use(express.json());

export function randomWord() : string{
  const randomIndex = Math.floor(Math.random() * 24);
  return words[randomIndex];
}

export function chageKeyboardColour(letters : {letter: string; colour: string;}[], letter : string, colour : string) {

  for (let i = 0; i < 26; i++) {

      if (letters[i].letter === letter) {

          if (letters[i].colour === 'green' && colour === 'orange') {

              return;
          }
          if (letters[i].colour === 'orange' && colour === 'gray') {

              return;
          }
          letters[i].colour = colour;
          break;
      }
  }
}

export function letterInGuessWord(guessWord : string, letter : string) {

  for (let i = 0; i < 5; i++) {

      if (letter === guessWord.charAt(i)) {

          return true;
      }
  }

  return false;
}

export function checkPlayer(index : number, word : wordType, guessWord : string, letters : lettersType, fiveLettersCorrect : number) : number {

  let indexOfGuessWord = 0;
  for (let i = index - 4; i <= index; i++) {

      if(word[i].letter === guessWord.charAt(indexOfGuessWord++)) {
          word[i].colour = 'green';
          chageKeyboardColour(letters, word[i].letter, 'green');
          fiveLettersCorrect++;
      }
      else if(letterInGuessWord(guessWord, word[i].letter)) {
          word[i].colour = 'orange';
          chageKeyboardColour(letters, word[i].letter, 'orange');
      }
      else{
          word[i].colour = 'gray';
          chageKeyboardColour(letters, word[i].letter, 'gray');
      }
  }
  return fiveLettersCorrect
}

app.get('/', (req, res) => {
  res.send("Hello World!")
});

app.post('/', (req, res) => {
  map.set(req.body.userData, randomWord());
});

app.post('/wordCheck', (req, res) => {

  const word : wordType = req.body.word;
  const letters : lettersType = req.body.lettersSent;
  const index : number = req.body.index.current;
  let fiveLettersCorrect : number = req.body.fiveLettersCorrect;
  const user : string = req.body.user;
  const guessWord : string = map.get(user) || "RAVEN";

  fiveLettersCorrect = checkPlayer(index, word, guessWord, letters, fiveLettersCorrect)

  res.send({word, letters, fiveLettersCorrect});
})

app.listen(port);