import React, { useState } from 'react';
import './App.css';
import ScrabbleForm from './ScrabbleForm';
import ScrabbleScores from './ScrabbleScores';

const App = () => {
  const [scores, setScores] = useState([]);

  const addScore = (newScore) => {
    setScores((prevScores) => [newScore, ...prevScores]);
  };

  return (
    <div className="App">
      <h1>Scrabble Score Calculator</h1>
      <ScrabbleForm addScore={addScore} />
      {scores.length > 0 && <ScrabbleScores scores={scores} />}
    </div>
  );
};

export default App;