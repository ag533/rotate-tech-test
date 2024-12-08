const express = require('express');
const router = express.Router();

const letterValues = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};

router.post('/scrabble-score', (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ error: 'Input cannot be empty' });
  }

  if (typeof word !== 'string' || !/^[a-zA-Z]+$/.test(word)) {
    return res.status(400).json({ error: 'Input must contain only alphabetic characters' });
  }

  const score = word.toUpperCase().split('').reduce((acc, char) => acc + letterValues[char], 0);
  res.json({ score });
});

module.exports = router;