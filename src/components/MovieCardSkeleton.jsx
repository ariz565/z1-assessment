function MovieCardSkeleton() {
  return (
    <div className="movie-card skeleton">
      <div className="movie-poster skeleton-img"></div>
      <div className="movie-info">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-year"></div>
      </div>
    </div>
  );
}

export default MovieCardSkeleton;
