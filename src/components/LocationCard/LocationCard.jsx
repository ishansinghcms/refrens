import PropTypes from 'prop-types';
import classes from './style.module.css';
import { forwardRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationCard = forwardRef(({ url }, ref) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // function to fetch a particular location
  const fetchItem = async () => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchItem();
  });

  //handles previous web page navigation
  const handeClick = (id) => {
    navigate(`/characters/${id}?loc=true`);
  };
  return (
    <>
      {!loading && (
        <div
          onClick={() => {
            handeClick(data.id);
          }}
          ref={ref}
          className={classes.container}
          key={data.id}
        >
          <img src={data.image} alt={`${data.name}`} />
          <p className={classes.location_name}>{data.name}</p>
        </div>
      )}
    </>
  );
});

// Set a display name for the component
LocationCard.displayName = 'LocationCard';

// Define prop types
LocationCard.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LocationCard;
