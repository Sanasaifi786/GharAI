import React, { useState, useEffect } from "react";
import { decodeQueryParam } from "../utils/urlParams.js";

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedQuery = decodeQueryParam();
    if (savedQuery) {
      setInput(savedQuery);
      onSearch(savedQuery);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  const handleClear = () => {
    setInput("");
    onSearch("");
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          id="property-search-input"
          type="text"
          className="search-input"
          placeholder='Try "3BHK near school in Sector 50 under 1Cr"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          aria-label="Search for properties"
          autoComplete="off"
        />
        {input && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button
        id="search-submit-btn"
        type="submit"
        className="search-submit-btn"
        disabled={loading || !input.trim()}
      >
        {loading ? <span className="btn-spinner" /> : "Search"}
      </button>
    </form>
  );
}
