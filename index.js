const express = require('express');
const bodyParser = require('body-parser');
const utils = require('req-res-utils');
const movieHelper = require('./src/movie');

const port = process.env.PORT || 3030;
const serviceName = process.env.SERVICE_NAME || 'movie-info';
const failPercent = process.env.FAIL_PERCENT || 0.3;
const maxAllowed = process.env.MAX_ALLOWED || 10;

// Load sample data
const movies = require('./data/indexed_movies.json');

// Initialize the app
const app = express();

app.use(
  bodyParser.json(),
  (req, res, next) => {
    const incomingHeaders = req.headers;
    const headers = Object.assign(
      utils.getCORSHeaders(),
      utils.forwardTraceHeaders(incomingHeaders)
    );
    res.set(headers);
    if (Math.random() < failPercent) {
      // Simulate a failure
      console.log("Failing");
      res.sendStatus(500);
    } else if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  }
);

// Simple REST endpoint for artist info
app.get('/movies', (req, res) => {
  try {
    const moviesResponse = utils.createResponse(
      req.query,
      maxAllowed,
      movies,
      movieHelper.createMovieInfo
    );
    res.send(moviesResponse);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`${serviceName} listening on port ${port}!`);
  console.log(`Failure rate is set to ${failPercent}`);
  console.log(`Max allowed ids are set to ${maxAllowed}`);
});
