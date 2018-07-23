const movieHelper = require('../src/movie');

const movies = {
  "11": {
    "id": 11,
    "title": "Star Wars",
    "tagline": "A long time ago in a galaxy far, far away...",
    "overview": "Princess Leia is captured and held hostage...",
    "popularity": 43.788475,
    "rating": 8.1,
    "ratingCount": 8848,
    "runtime": 121,
    "releaseDate": "1977-05-25",
    "revenue": 775398007,
    "budget": 11000000,
    "posterPath": "/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg",
    "originalLanguage": "en",
    "genres": [{
      "id": 12,
      "name": "Adventure"
    }, {
      "id": 28,
      "name": "Action"
    }, {
      "id": 878,
      "name": "Science Fiction"
    }],
    "cast": [{
      "id": 2,
      "gender": 2,
      "name": "Mark Hamill",
      "character": "Luke Skywalker",
      "profilePath": "/fk8OfdReNltKZqOk2TZgkofCUFq.jpg"
    }, {
      "id": 3,
      "gender": 2,
      "name": "Harrison Ford",
      "character": "Han Solo",
      "profilePath": "/7LOTdRfHU1H1qHBxpUv3jT04eWB.jpg"
    }, {
      "id": 4,
      "gender": 1,
      "name": "Carrie Fisher",
      "character": "Princess Leia Organa",
      "profilePath": "/oVYiGe4GzgQkoJfdHg8qKqEoWJz.jpg"
    }, {
      "id": 5,
      "gender": 2,
      "name": "Peter Cushing",
      "character": "Grand Moff Tarkin",
      "profilePath": "/1qtKVu16REL2YLVrhayjVey4al.jpg"
    }, {
      "id": 12248,
      "gender": 2,
      "name": "Alec Guinness",
      "character": "Obi-Wan \"Ben\" Kenobi",
      "profilePath": "/nv3ppxgUQJytFGXZNde4f9ZlshB.jpg"
    }, {
      "id": 6,
      "gender": 2,
      "name": "Anthony Daniels",
      "character": "See Threepio (C-3PO)",
      "profilePath": "/cljvryjb3VwTsNR7fjQKjNPMaBB.jpg"
    }, {
      "id": 130,
      "gender": 2,
      "name": "Kenny Baker",
      "character": "Artoo-Detoo (R2-D2)",
      "profilePath": "/sdd9rgifNF9C51RejG7sUGU8Bka.jpg"
    }]
  }
}

test('returns the correct movie info for an existing movieId', () => {
  const movieId = 11
  const response = movieHelper.createMovieInfo(movies, movieId);

  expect(response).toEqual({
    "id": 11,
    "title": "Star Wars",
    "tagline": "A long time ago in a galaxy far, far away...",
    "overview": "Princess Leia is captured and held hostage...",
    "popularity": 43.788475,
    "runtime": 121,
    "releaseDate": "1977-05-25",
    "revenue": 775398007,
    "budget": 11000000,
    "posterPath": "https://image.tmdb.org/t/p/w342/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg",
    "originalLanguage": "en",
    "genres": [12, 28, 878],
    "cast": [2, 3, 4, 5, 12248, 6, 130]
  });
});

test('if movieId does not exist, we get an exception', () => {
  const movieId = 0
  
  expect( () =>  movieHelper.createMovieInfo(movies, movieId)).toThrowError(Error);
});