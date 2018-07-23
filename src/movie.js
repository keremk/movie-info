// Response resolvers
const createMovieInfo = (movies, movieId) => {
  const resolvePosterPath = movie => `https://image.tmdb.org/t/p/w342${movie.posterPath}`;
  const resolveCast = movie => movie.cast.map(artist => artist.id);
  const resolveGenres = movie => movie.genres.map(genre => genre.id);

  const movie = movies[movieId];
  if (typeof movie == 'undefined') {
    throw Error(`MovieId ${movieId} is unknown`);
  } else {
    return {
      id: movie.id,
      title: movie.title,
      tagline: movie.tagline,
      overview: movie.overview,
      popularity: movie.popularity,
      runtime: movie.runtime,
      releaseDate: movie.releaseDate,
      revenue: movie.revenue,
      budget: movie.budget,
      posterPath: resolvePosterPath(movie),
      originalLanguage: movie.originalLanguage,
      genres: resolveGenres(movie),
      cast: resolveCast(movie)
    }  
  }
};

module.exports = {
  createMovieInfo: createMovieInfo
}