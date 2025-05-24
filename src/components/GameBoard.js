import React from 'react';
import './GameBoard.css';

const GameBoard = ({ guesses, currentGuess, wordLength }) => {
  const totalRows = 6;
  const rows = [...guesses];

  if (rows.length < totalRows) {
    const currentRow = [...Array(wordLength)].map((_, i) => ({
      letter: currentGuess[i] || '',
      status: null,
    }));
    rows.push(currentRow);
  }

  while (rows.length < totalRows) {
    const emptyRow = Array(wordLength).fill({ letter: '', status: null });
    rows.push(emptyRow);
  }

  return (
    <div className="board">
      {rows.map((guess, index) => (
        <div key={index} className="row">
          {guess.map((cell, i) => (
            <div key={i} className={`cell ${cell.status || ''}`}>
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
