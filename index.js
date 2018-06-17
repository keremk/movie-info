const express = require('express');
const bodyParser = require('body-parser');
const R = require('ramda');
const utils = require('req-res-utils');

const port = process.env.PORT || 3030;
const serviceName = process.env.SERVICE_NAME || 'movie-info';
const failPercent = process.env.FAIL_PERCENT || 0.3;
const maxAllowed = process.env.MAX_ALLOWED || 10;

// Load sample data
const movies = require('./data/indexed_movies.json');

// Response resolvers
const createMovieInfo = (movies, movieId) => {
  const resolvePosterPath = movie => `https://image.tmdb.org/t/p/w342${movie.posterPath}`;
  const resolveCast = movie => movie.cast.map(artist => artist.id);
  const resolveGenres = movie => movie.genres.map(genre => genre.id);

  const movie = movies[movieId];
  
  return {
    "id": movie.id,
    "title": movie.title,
    "tagline": movie.tagline,
    "overview": movie.overview,
    "popularity": movie.popularity,
    "runtime": movie.runtime,
    "releaseDate": movie.releaseDate,
    "revenue": movie.revenue,
    "budget": movie.budget,
    "posterPath": resolvePosterPath(movie),
    "originalLanguage": movie.originalLanguage,
    "genres": resolveGenres(movie),
    "cast": resolveCast(movie)
  }  
};

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
      createMovieInfo
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
