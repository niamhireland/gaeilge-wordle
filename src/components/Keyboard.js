import React from 'react';
import './Keyboard.css'; 

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Á', 'É', 'Í', 'Ó', 'Ú'],
];

const Keyboard = ({ onKeyPress }) => {
  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className="key"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button className="key special" onClick={() => onKeyPress('BACKSPACE')}>⌫</button>
        <button className="key special" onClick={() => onKeyPress('ENTER')}>ENTER</button>
      </div>
    </div>
  );
};

export default Keyboard;