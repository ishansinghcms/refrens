import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../Card/Card';

const InfiniteScroll = ({ apiUrl }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const fetchItems = useCallback(async () => {
    if (!hasMore) return;
    try {
      const response = await fetch(`${apiUrl}/?page=${page}`);
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data.results]);
      setHasMore(data.info.next ? true : false);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [page, hasMore, apiUrl]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div>
      {items.map((item, index) => {
        if (items.length === index + 1) {
          return <Card ref={lastItemRef} item={item} key={item.id} />;
        } else {
          return <Card item={item} key={item.id} />;
        }
      })}
      {hasMore && <div>Loading more items...</div>}
    </div>
  );
};

// Define prop types
InfiniteScroll.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default InfiniteScroll;
