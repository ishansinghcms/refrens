import classes from './style.module.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LocationCard from '../LocationCard/LocationCard';

export default function Location() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const loc = useLocation();
  const id = loc.pathname.match(/\/(\d+)(?!.*\d)/)[0];
  const navigate = useNavigate();

  // function to fetch a particular location
  const fetchItems = async () => {
    try {
      console.log('object');
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${id}`
      );
      const data = await response.json();
      setLocation(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  //handles previous web page navigation
  const handleClick = () => {
    navigate('/locations');
  };

  return (
    <>
      <div className={classes.buttonContainer}>
        <Link onClick={handleClick} className={classes.back}>
          {`\u21A9 `}Back
        </Link>
      </div>
      {loading && <h3>Loading...</h3>}
      {!loading && (
        <div className={classes.container}>
          <div className={classes.origin}>
            <h3>LOCATION CARD</h3>
            <div className={classes.location_details}>
              <p>
                <span>Name: </span>
                {location.name}
              </p>
              <p>
                <span>Type: </span>
                {location.type}
              </p>
              <p>
                <span>Dimension: </span>
                {location.dimension}
              </p>
              <p>
                <span>Number of Residents: </span>
                {location.residents.length}
              </p>
            </div>
          </div>

          <div className={classes.locations}>
            {location.residents.length > 0 && (
              <>
                <h3>RESIDENTS</h3>
                <div>
                  {location.residents.map((url, index) => (
                    <LocationCard key={index} url={url} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
