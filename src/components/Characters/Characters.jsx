import classes from './style.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import { useState, useRef } from 'react';
import Controls from '../Controls/Controls';
import FilteredContent from '../FilteredContent/FilteredContent';

let searchValue;
let filterValue;

export default function Characters() {
  const [isOpen, setIsOpen] = useState({ open: false, text: 'Filters' });
  const [filters, setFilters] = useState({
    status: '',
    species: '',
    gender: '',
  });
  const [content, setContent] = useState({
    infiniteScroll: true,
    customFilter: false,
    filterByName: false,
  });

  // for accessing input field's value
  const ref = useRef();
  const location = useLocation();

  // extracting current path to display data on UI conditionally
  const currentPath = location.pathname.startsWith('/')
    ? location.pathname.substring(1)
    : location.pathname;

  // handles change in filter dropdown
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  //toggles the popup
  const togglePopup = () => {
    setIsOpen({
      open: !isOpen.open,
      text: isOpen.open ? 'Filters' : 'Close Filters',
    });
  };

  // function to apply filters and later call required API
  const applyFilters = () => {
    togglePopup();
    if (!filters.status && !filters.gender && !filters.species) return;
    filterValue = `status=${filters.status}&gender=${filters.gender}&species=${filters.species}`;
    setContent({
      infiniteScroll: false,
      customFilter: true,
      filterByName: false,
    });
  };

  // handles searching through name
  const handleSearch = () => {
    searchValue = ref.current.value;
    setContent({
      infiniteScroll: false,
      customFilter: false,
      filterByName: true,
    });
  };

  return (
    <div className={classes.container}>
      {currentPath === 'characters' && (
        <>
          <Controls
            ref={ref}
            handleChange={handleChange}
            applyFilters={applyFilters}
            handleSearch={handleSearch}
            filters={filters}
            isOpen={isOpen}
            togglePopup={togglePopup}
          />
          {content.infiniteScroll && (
            <InfiniteScroll apiUrl="https://rickandmortyapi.com/api/character" />
          )}
          {content.customFilter && (
            <FilteredContent
              apiUrl={`https://rickandmortyapi.com/api/character?${filterValue}`}
              setContent={setContent}
            />
          )}
          {content.filterByName && (
            <FilteredContent
              apiUrl={`https://rickandmortyapi.com/api/character?name=${searchValue}`}
              setContent={setContent}
            />
          )}
        </>
      )}
      <Outlet />
    </div>
  );
}
