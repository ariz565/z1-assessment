function MovieDetail({ movie, onBack }) {
  // Check if poster exists and is not 'N/A'
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.style.display = 'none'; // Hide the broken image
    e.target.parentNode.classList.add('show-placeholder');
  };

  return (
    <div className="movie-detail">
      <div className="detail-actions">
        <button className="back-button" onClick={onBack}>
          ← Back to results
        </button>
        <button className="new-search-button" onClick={() => onBack()}>
          New Search
        </button>
      </div>

      <div className="detail-container">
        <div className={`detail-poster ${!hasPoster ? 'show-placeholder' : ''}`}>
          {hasPoster ? (
            <img 
              src={movie.Poster} 
              alt={`${movie.Title} poster`} 
              onError={handleImageError} 
            />
          ) : (
            <div className="poster-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M17 18H7l2.66-4.4a1 1 0 0 1 1.68 0L14 16.8l.7-1a1 1 0 0 1 1.6 0l.7 1.2"></path>
              </svg>
              <p>No Poster Available</p>
            </div>
          )}
        </div>

        <div className="detail-info">
          <h2>
            {movie.Title} <span className="year">({movie.Year})</span>
          </h2>

          <div className="meta-info">
            <span className="rating">{movie.Rated}</span>
            <span className="runtime">{movie.Runtime}</span>
            <span className="genre">{movie.Genre}</span>
          </div>
          <div className="ratings">
            {movie.Ratings &&
              movie.Ratings.map((rating, index) => (
                <div key={index} className="rating-item">
                  <span className="rating-source">{rating.Source}:</span>
                  <span className="rating-value">{rating.Value}</span>
                </div>
              ))}
          </div>

          <div className="plot">
            <h3>Plot</h3>
            <p>{movie.Plot}</p>
          </div>

          <div className="credits">
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Writers:</strong> {movie.Writer}
            </p>
            <p>
              <strong>Stars:</strong> {movie.Actors}
            </p>
          </div>

          {movie.Awards !== "N/A" && (
            <div className="awards">
              <p>
                <strong>Awards:</strong> {movie.Awards}
              </p>
            </div>
          )}

          {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
            <div className="boxoffice">
              <p>
                <strong>Box Office:</strong> {movie.BoxOffice}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
