const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require("cors");
const scrabbleScoreRouter = require('./scrabbleScore');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello World!` }));
});

app.use('/api', scrabbleScoreRouter);

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
