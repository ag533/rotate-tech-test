import React, { useState } from 'react';

const ScrabbleScores = ({ scores }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const scoresPerPage = 10;

  // Calculate the current scores to display
  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScores = scores.slice(indexOfFirstScore, indexOfLastScore);

  // Calculate the total number of pages
  const totalPages = Math.ceil(scores.length / scoresPerPage);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="scrabble-scores">
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {currentScores.map((score, index) => (
            <tr key={index}>
              <td>{score.word}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          {"<<"}
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        <button disabled>{currentPage}</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          {">"}
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default ScrabbleScores;