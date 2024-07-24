import PropTypes from 'prop-types';
import classes from './style.module.css';
import { forwardRef } from 'react';

const Controls = forwardRef(
  (
    { applyFilters, handleChange, handleSearch, filters, isOpen, togglePopup },
    ref
  ) => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };
    return (
      <div className={classes.controls}>
        <input
          className={classes.search}
          type="text"
          placeholder="search by name..."
          ref={ref}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className={classes.search_button}>
          Search
        </button>
        <button onClick={togglePopup}>{isOpen.text}</button>
        {isOpen.open && (
          <div className={classes.filter_container}>
            <h3>Select Filters</h3>
            <div className={classes.filter_section}>
              <label>Status:</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div className="filter-section">
              <label>Species:</label>
              <select
                name="species"
                value={filters.species}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="human">Human</option>
                <option value="alien">Alien</option>
              </select>
            </div>
            <div className="filter-section">
              <label>Gender:</label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <button className={classes.apply} onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        )}
      </div>
    );
  }
);

Controls.displayName = 'Controls';

// Define prop types
Controls.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    status: PropTypes.string,
    species: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.shape({
    text: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
  }).isRequired,
  togglePopup: PropTypes.func.isRequired,
};

export default Controls;
