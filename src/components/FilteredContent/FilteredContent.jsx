import PropTypes from 'prop-types';
import Card from '../Card/Card';
import classes from './style.module.css';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function FilteredContent({ apiUrl, setContent }) {
  const [items, setItems] = useState([]);
  const [availableContent, setAvailableContent] = useState(true);
  const fetchItems = useCallback(async () => {
    try {
      setAvailableContent(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setItems([...data.results]);
    } catch (error) {
      setAvailableContent(false);
    }
  }, [apiUrl]);
  useEffect(() => {
    fetchItems();
  }, [apiUrl, fetchItems]);

  const handleClick = () => {
    setContent({
      infiniteScroll: true,
      customFilter: false,
      filterByName: false,
    });
  };
  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <Link onClick={handleClick} className={classes.back}>
          {`\u21A9 `}Back
        </Link>
      </div>
      {availableContent &&
        items.map((item) => <Card item={item} key={item.id} />)}
      {!availableContent && <p>No content found...</p>}
    </div>
  );
}

// Set a display name for the component
FilteredContent.displayName = 'FilteredContent';

// Define prop types
FilteredContent.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};
