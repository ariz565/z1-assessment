import { useState, useCallback } from "react";
import { debounce } from "../utils/debounce";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.length >= 3) {
        onSearch(searchTerm);
      }
    }, 500),
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

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a movie..."
        className="search-input"
        required
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
