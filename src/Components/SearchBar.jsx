/* eslint-disable react/prop-types */

import { FaSearch } from "react-icons/fa";
import "../assets/css/searchBar.css";

const SearchBar = ({
  handleSearch,
  searchTerm,
  setSearchTerm,
  setIncludeUniques,
}) => {
  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          type="search"
          placeholder="Enter card name"
          aria-label="Search a card by name"
        />

        <button onClick={handleSearch} className="search-button">
          <FaSearch className="search-icon" />
        </button>
        <div className="search-options">
          <input
            type="checkbox"
            name="unique"
            className="search-checkbox"
            onChange={(e) => {
              setIncludeUniques(e.target.checked);
            }}
            onClick={handleSearch}
          />
          <p className="search-text">Include unique prints</p>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
