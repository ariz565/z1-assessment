import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [fadeOut, setFadeOut] = useState(false);

  // Apply dark mode effect
  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Use API key from environment variables
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const searchMovies = async (term, page = 1) => {
    if (!term) return;

    setLoading(true);
    setError("");
    setSelectedMovie(null);
    setSearchTerm(term);
    setCurrentPage(page);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${term}&page=${page}&apikey=${API_KEY}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setTotalResults(Number(response.data.totalResults));

        // Save search term to recent searches
        if (term && !recentSearches.includes(term)) {
          const newSearches = [term, ...recentSearches.slice(0, 4)];
          setRecentSearches(newSearches);
          localStorage.setItem("recentSearches", JSON.stringify(newSearches));
        }
      } else {
        setError(response.data.Error || "No movies found");
        setMovies([]);
      }
    } catch (error) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (id) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`
      );

      if (response.data.Response === "True") {
        setSelectedMovie(response.data);
      } else {
        setError("Movie details not available");
      }
    } catch (error) {
      setError("Failed to load movie details");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    searchMovies(searchTerm, page);
  };

  const handleBackToResults = () => {
    setSelectedMovie(null);
  };

  const handleClearSearch = () => {
    // Trigger fade-out animation
    setFadeOut(true);

    // After animation completes, clear the results
    setTimeout(() => {
      setMovies([]);
      setSearchTerm("");
      setFadeOut(false);
    }, 500); // Match this with CSS transition duration
  };

  return (
    <div className="app-container">
      <div className="theme-container">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <header>
        <h1>🎬 Movie Search App</h1>
        <div className="app-tagline">Find and explore movies instantly</div>
        <div className="header-controls">
          <SearchBar onSearch={searchMovies} onClear={handleClearSearch} />
        </div>

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <div className="recent-searches-header">
              <h3>Recent Searches:</h3>
              <button
                className="clear-searches-btn"
                onClick={() => {
                  setRecentSearches([]);
                  localStorage.removeItem("recentSearches");
                }}
                aria-label="Clear recent searches"
                title="Clear recent searches"
              >
                ✕
              </button>
            </div>
            <div className="search-tags">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  className="search-tag"
                  onClick={() => searchMovies(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {error && !loading && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!error && !selectedMovie && (
          <>
            <div className={`movie-results ${fadeOut ? "fade-out" : ""}`}>
              <MovieList
                movies={movies}
                onMovieSelect={getMovieDetails}
                loading={loading}
              />
              {!loading && movies.length > 0 && totalResults > 10 && (
                <Pagination
                  currentPage={currentPage}
                  totalResults={totalResults}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}

        {!loading && !error && selectedMovie && (
          <MovieDetail movie={selectedMovie} onBack={handleBackToResults} />
        )}

        {!loading &&
          !error &&
          !selectedMovie &&
          movies.length === 0 &&
          searchTerm && (
            <div className="no-results">
              <p>
                No movies found for "{searchTerm}". Try another search term.
              </p>
            </div>
          )}
      </main>

      <footer>
        <p>
          Movie Search App &copy; {new Date().getFullYear()} | Powered by OMDb
          API
        </p>
      </footer>
    </div>
  );
}

export default App;
