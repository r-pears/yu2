import React, { useState, useCallback } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("name");

  // better to use useCallback to memoize the function and break it out instead of having it inline
  const handleQueryChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  // better to use useCallback to memoize the function and break it out instead of having it inline
  const handleSearchTypeChange = useCallback((e) => {
    setSearchType(e.target.value);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (!query.trim()) return;
      onSearch(query, searchType);
    },
    [query, searchType, onSearch]
  );

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      {/* dont need to have a keyup event here, just use the onChange event 
      added aria-label for accessibilty */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={handleQueryChange}
        aria-label="Search input"
      />
      <select
        value={searchType}
        onChange={handleSearchTypeChange}
        aria-label="Search type"
      >
        <option value="name">By Name</option>
        <option value="ingredient">By Ingredient</option>
        <option value="letter">By First Letter</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
