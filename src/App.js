import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';

const TARGET_WORD = 'ÁRÁN';
const WORD_LENGTH = TARGET_WORD.length;

export function evaluateGuess(guess, target) {
  const result = [];
  const guessLetters = guess.split('');
  const targetLetters = target.split('');
  const usedIndices = new Set();

  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      result.push({ letter, status: 'correct' });
      usedIndices.add(i);
    } else {
      result.push({ letter, status: null });
    }
  });

  result.forEach((entry, i) => {
    if (entry.status === null) {
      const index = targetLetters.findIndex(
        (l, idx) => l === entry.letter && !usedIndices.has(idx)
      );
      if (index !== -1) {
        entry.status = 'present';
        usedIndices.add(index);
      } else {
        entry.status = 'absent';
      }
    }
  });

  return result;
}

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const appRef = useRef(null);

  useEffect(() => {
    appRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleSubmitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) return;

    const evaluated = evaluateGuess(currentGuess, TARGET_WORD);
    setGuesses([...guesses, evaluated]);
    setCurrentGuess('');
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    if (key === 'ENTER') {
      handleSubmitGuess();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[A-ZÁÉÍÓÚ]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleScreenKeyPress = (key) => {
    const upperKey = key.toUpperCase();
    if (upperKey === 'ENTER') {
      handleSubmitGuess();
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

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        wordLength={WORD_LENGTH}
      />

      <Keyboard onKeyPress={handleScreenKeyPress} />
    </div>
  );
}

export default App;