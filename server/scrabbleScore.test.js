const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const scrabbleScoreRouter = require('./scrabbleScore');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', scrabbleScoreRouter);

describe('POST /api/scrabble-score', () => {
  it('should return the correct score for a valid word', async () => {
    const response = await request(app)
      .post('/api/scrabble-score')
      .send({ word: 'cabbage' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ score: 14 });
  });

  it('should handle case insensitivity', async () => {
    const response = await request(app)
      .post('/api/scrabble-score')
      .send({ word: 'Cabbage' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ score: 14 });
  });

  it('should return an error for non-alphabetic characters', async () => {
    const response = await request(app)
      .post('/api/scrabble-score')
      .send({ word: 'cabbage123' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Input must contain only alphabetic characters' });
  });

  it('should return an error for empty input', async () => {
    const response = await request(app)
      .post('/api/scrabble-score')
      .send({ word: '' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Input cannot be empty' });
  });
});