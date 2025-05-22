function MovieDetail({ movie, onBack }) {
  // Check if poster exists and is not 'N/A'
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.style.display = "none"; // Hide the broken image
    e.target.parentNode.classList.add("show-placeholder");
  };
  return (
    <div className="movie-detail">
      <div className="detail-actions">
        {" "}
        <button className="back-button" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to results
        </button>
        <button className="new-search-button" onClick={() => onBack()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Start New Search
        </button>
      </div>

      <div className="detail-container">
        <div
          className={`detail-poster ${!hasPoster ? "show-placeholder" : ""}`}
        >
          {hasPoster ? (
            <img
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              onError={handleImageError}
            />
          ) : (
            <div className="poster-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="2.18"
                  ry="2.18"
                ></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
              <p>No Poster Available</p>
            </div>
          )}
        </div>{" "}
        <div className="detail-info">
          <h2>
            {movie.Title} <span className="year">({movie.Year})</span>
          </h2>
          <div className="meta-info">
            {movie.Rated !== "N/A" && (
              <span className="rating">{movie.Rated}</span>
            )}
            {movie.Runtime !== "N/A" && (
              <span className="runtime">{movie.Runtime}</span>
            )}
            {movie.Genre !== "N/A" &&
              movie.Genre.split(", ").map((genre, index) => (
                <span key={index} className="genre">
                  {genre}
                </span>
              ))}
          </div>
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="ratings">
              {movie.Ratings.map((rating, index) => (
                <div key={index} className="rating-item">
                  <span className="rating-source">{rating.Source}</span>
                  <span className="rating-value">{rating.Value}</span>
                </div>
              ))}
            </div>
          )}{" "}
          <div className="plot">
            <h3>Plot</h3>
            <p>
              {movie.Plot !== "N/A"
                ? movie.Plot
                : "No plot description available."}
            </p>
          </div>
          <div className="credits">
            {movie.Director !== "N/A" && (
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
            )}
            {movie.Writer !== "N/A" && (
              <p>
                <strong>Writers:</strong> {movie.Writer}
              </p>
            )}
            {movie.Actors !== "N/A" && (
              <p>
                <strong>Stars:</strong> {movie.Actors}
              </p>
            )}
            {movie.Released !== "N/A" && (
              <p>
                <strong>Released:</strong> {movie.Released}
              </p>
            )}
            {movie.Country !== "N/A" && (
              <p>
                <strong>Country:</strong> {movie.Country}
              </p>
            )}
            {movie.Language !== "N/A" && (
              <p>
                <strong>Language:</strong> {movie.Language}
              </p>
            )}
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
