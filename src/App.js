import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';

const TARGET_WORD = 'ÁRÁN';
const WORD_LENGTH = TARGET_WORD.length;

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const appRef = useRef(null);

  useEffect(() => {
    appRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    if (key === 'ENTER' && currentGuess.length === WORD_LENGTH) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[A-ZÁÉÍÓÚ]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleScreenKeyPress = (key) => {
    const upperKey = key.toUpperCase();
    if (upperKey === 'ENTER' && currentGuess.length === WORD_LENGTH) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');
    } else if (upperKey === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[A-ZÁÉÍÓÚ]$/.test(upperKey) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + upperKey);
    }
  };

  return (
    <div
      className="app"
      tabIndex={0}
      ref={appRef}
      onKeyDown={handleKeyDown}
    >
      <h1>Focail</h1>
      <GameBoard guesses={[...guesses, currentGuess]} wordLength={WORD_LENGTH} />
      <Keyboard onKeyPress={handleScreenKeyPress} />
    </div>
  );
}

export default App;