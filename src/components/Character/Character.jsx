import classes from './style.module.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Character() {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const id = location.pathname.match(/\/(\d+)(?!.*\d)/)[0];
  const navigate = useNavigate();
  // Get the search parameters from the current URL
  const searchParams = new URLSearchParams(location.search);
  // Extract the value of the query parameters
  const locValue = searchParams.get('loc');
  const epiValue = searchParams.get('epi');

  //function to fetch a particular character
  const fetchItems = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      let originResponse,
        originalLocationData,
        currentResponse,
        currentLocationData;
      if (data.origin.url) {
        originResponse = await fetch(data.origin.url);
        originalLocationData = await originResponse.json();
      }
      if (data.location.url) {
        currentResponse = await fetch(data.location.url);
        currentLocationData = await currentResponse.json();
      }
      let episodes = [];
      if (data.episode) {
        for (let iter = 0; iter < data.episode.length; iter++) {
          const episodeResponse = await fetch(data.episode[iter]);
          const episodeData = await episodeResponse.json();
          episodes.push(episodeData);
        }
      }
      setCharacter({
        data: data,
        origin: originalLocationData,
        current: currentLocationData,
        episodes: episodes,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  useEffect(() => {
    fetchItems();
  });

  const handleClick = () => {
    if (locValue) navigate('/locations');
    else if (epiValue) navigate('/episodes');
    else navigate('/characters');
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
          <h3>CHARACTER CARD</h3>
          <div className={classes.character_card}>
            <img src={character.data.image} alt="character's photo" />
            <div className={classes.details}>
              <p>
                <span>Name: </span>
                {character.data.name}
              </p>
              <p>
                <span>Status: </span>
                {character.data.status}
              </p>
              <p>
                <span>Species: </span>
                {character.data.species}
              </p>
              <p>
                <span>Gender: </span>
                {character.data.gender}
              </p>
              <p>
                <span>Origin: </span>
                {character.data.origin.name === 'unknown' ? (
                  'unknown'
                ) : (
                  <Link>{character.data.origin.name}</Link>
                )}
              </p>
              <p>
                <span>Current Location: </span>
                {character.data.location.name === 'unknown' ? (
                  'unknown'
                ) : (
                  <Link>{character.data.location.name}</Link>
                )}
              </p>
            </div>
          </div>
          {character.origin && (
            <div className={classes.origin}>
              <h3>ORIGIN CARD</h3>
              <div className={classes.location_details}>
                <p>
                  <span>Name: </span>
                  {character.origin.name}
                </p>
                <p>
                  <span>Type: </span>
                  {character.origin.type}
                </p>
                <p>
                  <span>Dimension: </span>
                  {character.origin.dimension}
                </p>
                <p>
                  <span>Number of Residents: </span>
                  {character.origin.residents.length}
                </p>
              </div>
            </div>
          )}
          {character.current && (
            <div className={classes.current}>
              <h3>CURRENT LOCATION CARD</h3>
              <div className={classes.location_details}>
                <p>
                  <span>Name: </span>
                  {character.current.name}
                </p>
                <p>
                  <span>Type: </span>
                  {character.current.type}
                </p>
                <p>
                  <span>Dimension: </span>
                  {character.current.dimension}
                </p>
                <p>
                  <span>Number of Residents: </span>
                  {character.current.residents.length}
                </p>
              </div>
            </div>
          )}
          {character.episodes && (
            <div className={classes.episodes}>
              <h3>FEATURED EPISODES CARD</h3>
              <div className={classes.episode_details}>
                {character.episodes.map((e, index) => (
                  <p key={index}>
                    <span>{index + 1}: </span>
                    <br />
                    <span>Episode Name- </span>
                    {e.name}
                    <br />
                    <span>Episode Number- </span> {e.episode}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
