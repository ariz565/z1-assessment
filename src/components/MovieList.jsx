import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

function MovieList({ movies, onMovieSelect, loading }) {
  return (
    <div className="movie-list">
      {loading
        ? Array(6)
            .fill()
            .map((_, index) => <MovieCardSkeleton key={index} />)
        : movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => onMovieSelect(movie.imdbID)}
            />
          ))}
    </div>
  );
}

export default MovieList;
