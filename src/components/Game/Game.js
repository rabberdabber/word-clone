import React, { useCallback, useState } from 'react';

import { sample, range } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function GameGrid({ guesses }){
  console.log(guesses);
  console.log(guesses.length)
  for(let i = 0; i < guesses.length; i++){
    const str = guesses[i];
    console.log(str.length)
  }

  return(
    <div className='game-wrapper'>
      <div className='guess-results'>

          {range(6).map(rowIndex => (
          <p key={rowIndex} className='guess'>
            {
              range(5).map(colIndex => (
                <span key={colIndex} className='cell'>{guesses?.length > rowIndex && guesses[rowIndex].length > colIndex && guesses[rowIndex][colIndex]}</span>
              ))
            }
        </p>
        ))
        }
      </div>
    </div>
  )
}

function GuessInputTextArea({ setGuesses }){
  const [guess, setGuess ] = useState('')

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    setGuesses((guesses) => {
      if (guesses.length === 6){
        return [];
      }
      const newGuesses = [...guesses]
      newGuesses.push(guess)
      return newGuesses
    })
    setGuess('')
  }, [guess])

  return (
    <form 
      className="guess-input-wrapper"
      onSubmit={onSubmitHandler}
    >
        <label htmlFor="guess-input">Enter guess:</label>
        <input id="guess-input" type="text" value={guess} onChange={(e) => setGuess(e.target.value)} />
    </form>
  )
}

function Game() {
  const [guesses, setGuesses] = useState([]);

  return (
    <>
      <GameGrid guesses={guesses}/>
      <GuessInputTextArea setGuesses={setGuesses} />
    </>
  )
}

export default Game;
