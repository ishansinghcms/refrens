import classes from './style.module.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EpisodeCard from '../EpisodeCard/EpisodeCard';

export default function Location() {
  const [loading, setLoading] = useState(true);
  const [episode, setEpisode] = useState({});
  const loc = useLocation();
  const id = loc.pathname.match(/\/(\d+)(?!.*\d)/)[0];
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      const data = await response.json();
      setEpisode(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  useEffect(() => {
    fetchItems();
  });
  const handleClick = () => {
    navigate('/episodes');
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
          <div className={classes.episode}>
            <h3>EPISODE CARD</h3>
            <div className={classes.episode_details}>
              <p>
                <span>Name: </span>
                {episode.name}
              </p>
              <p>
                <span>Air Date: </span>
                {episode.air_date}
              </p>
              <p>
                <span>Episode number: </span>
                {episode.episode}
              </p>
              <p>
                <span>Number of features characters: </span>
                {episode.characters.length}
              </p>
            </div>
          </div>

          <div className={classes.characters}>
            {episode.characters.length > 0 && (
              <>
                <h3>FEATURED CHARACTERS</h3>
                <div>
                  {episode.characters.map((url, index) => (
                    <EpisodeCard key={index} url={url} />
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
