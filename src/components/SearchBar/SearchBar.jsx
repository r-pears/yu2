import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search by name

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query, searchType);
  };

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
      />
      <select 
        value={searchType} 
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="name">By Name</option>
        <option value="ingredient">By Ingredient</option>
        <option value="letter">By First Letter</option>
      </select>
      <button onClick={handleSearch} type="button">Search</button>
    </form>
  );
};

export default SearchBar;
