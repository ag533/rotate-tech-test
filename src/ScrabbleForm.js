import React, { useState } from 'react';

const ScrabbleForm = ({ addScore }) => {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!word) {
      setError('Input cannot be empty');
      return;
    }
      
    if (!/^[a-zA-Z]+$/.test(word)) {
      setError('Input must contain only alphabetic characters');
      return;
    }

    try {
      const response = await fetch('/api/scrabble-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();
      if (response.ok) {
        addScore({ word, score: data.score });
        setWord('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while calculating the score');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='scrabble-form'>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
      />
      <button type="submit">Calculate</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ScrabbleForm;