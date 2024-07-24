import classes from './style.module.css';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import { useState, useRef } from 'react';
import FilteredContent from '../FilteredContent/FilteredContent';
import { useLocation, Outlet } from 'react-router-dom';

let searchValue;

export default function Locations() {
  const [content, setContent] = useState({
    infiniteScroll: true,
    filterByName: false,
  });

  // for accessing input field's value
  const ref = useRef();
  const location = useLocation();

  // extracting current path to display data on UI conditionally
  const currentPath = location.pathname.startsWith('/')
    ? location.pathname.substring(1)
    : location.pathname;

  // handles searching through name
  const handleSearch = () => {
    searchValue = ref.current.value;
    setContent({
      infiniteScroll: false,
      filterByName: true,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={classes.container}>
      {currentPath === 'episodes' && (
        <>
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
            <p>Click on an episode card to view its characters.</p>
          </div>
          {content.infiniteScroll && (
            <InfiniteScroll apiUrl="https://rickandmortyapi.com/api/episode" />
          )}
          {content.filterByName && (
            <FilteredContent
              apiUrl={`https://rickandmortyapi.com/api/episode?name=${searchValue}`}
              setContent={setContent}
            />
          )}
        </>
      )}
      <Outlet />
    </div>
  );
}
