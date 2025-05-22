function MovieCard({ movie, onClick }) {
  // Check if poster exists and is not 'N/A'
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.style.display = 'none'; // Hide the broken image
    e.target.parentNode.classList.add('show-placeholder');
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <div className={`movie-poster ${!hasPoster ? 'show-placeholder' : ''}`}>
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
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;