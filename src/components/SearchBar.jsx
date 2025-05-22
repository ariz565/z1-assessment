import { useState, useCallback } from "react";
import { debounce } from "../utils/debounce";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const debouncedSearch = useCallback(
    (searchTerm) => {
      debounce((term) => {
        if (term.length >= 3) {
          onSearch(term);
        }
      }, 500)(searchTerm);
    },
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    // Focus back on input after clearing
    document.querySelector(".search-input").focus();
  };

  return (
    <div className="search-container">
      <form
        className={`search-form ${isFocused ? "focused" : ""} ${
          isHovered ? "hovered" : ""
        }`}
        onSubmit={handleSubmit}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="search-input-container">
          <div className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a movie..."
            className="search-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
          />
          {query && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          <span className="button-text">Search</span>
          <span className="button-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
