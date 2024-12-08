import React, { useState } from 'react';
import './App.css';
import ScrabbleForm from './ScrabbleForm';

const App = () => {
  const [scores, setScores] = useState([]);

  const addScore = (score) => {
    setScores([...scores, score]);
  };

  return (
    <div className="App">
      <h1>Scrabble Score Calculator</h1>
      <ScrabbleForm addScore={addScore} />
    </div>
  );
};

export default App;