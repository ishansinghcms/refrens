import PropTypes from 'prop-types';
import classes from './style.module.css';
import { forwardRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EpisodeCard = forwardRef(({ url }, ref) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

  const handeClick = (id) => {
    navigate(`/characters/${id}?epi=true`);
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
EpisodeCard.displayName = 'EpisodeCard';

// Define prop types
EpisodeCard.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EpisodeCard;
