import React from 'react';
import './GameBoard.css'; 

const GameBoard = ({ guesses, wordLength }) => {
  return (
    <div className="board">
      {guesses.map((guess, index) => (
        <div key={index} className="row">
          {[...Array(wordLength)].map((_, i) => (
            <div key={i} className="cell">
              {guess[i] || ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;