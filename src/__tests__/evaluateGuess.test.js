import { evaluateGuess } from '../App'; 

describe('evaluateGuess', () => {
  it('returning correct statuses for correct guess', () => {
    const guess = 'ÁRÁN';
    const target = 'ÁRÁN';

    const result = evaluateGuess(guess, target);

    expect(result).toEqual([
      { letter: 'Á', status: 'correct' },
      { letter: 'R', status: 'correct' },
      { letter: 'Á', status: 'correct' },
      { letter: 'N', status: 'correct' },
    ]);
  });

  it('marking letters as present or absent appropriately', () => {
    const guess = 'ÁNÁB';
    const target = 'ÁRÁN';

    const result = evaluateGuess(guess, target);

    expect(result).toEqual([
      { letter: 'Á', status: 'correct' },
      { letter: 'N', status: 'present' },
      { letter: 'Á', status: 'correct' },
      { letter: 'B', status: 'absent' },
    ]);
  });

  it('handling repeated letters correctly', () => {
    const guess = 'AAAA';
    const target = 'ÁRÁN';

    const result = evaluateGuess(guess, target);

    expect(result).toEqual([
      { letter: 'A', status: 'absent' },
      { letter: 'A', status: 'absent' },
      { letter: 'A', status: 'absent' },
      { letter: 'A', status: 'absent' },
    ]);
  });
});
