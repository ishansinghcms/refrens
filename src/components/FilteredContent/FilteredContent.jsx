import Card from '../Card/Card';
import classes from './style.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FilteredContent({ apiUrl, setContent }) {
  const [items, setItems] = useState([]);
  const [availableContent, setAvailableContent] = useState(true);
  const fetchItems = async () => {
    try {
      setAvailableContent(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setItems([...data.results]);
    } catch (error) {
      setAvailableContent(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, [apiUrl]);

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
