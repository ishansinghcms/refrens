import classes from './style.module.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import refrensLogo from '../../assets/refrens.png';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname.startsWith('/')
    ? location.pathname.substring(1)
    : location.pathname;
  const [active, setActive] = useState(currentPath ? currentPath : 'home');
  const clickHandler = (event) => {
    const id = event.target.id;
    if (
      id === 'home' ||
      id === 'characters' ||
      id === 'locations' ||
      id === 'episodes'
    )
      setActive(event.target.id);
  };
  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <img src={refrensLogo} alt="Refrens Logo" />
          <span>Refrens Assignment</span>
        </div>
        <div className={classes.links} onClick={clickHandler}>
          <Link
            to="/"
            className={`${classes.link} ${
              active === 'home' ? classes.active : ''
            }`}
            id="home"
          >
            Home
          </Link>
          <Link
            to="/characters"
            className={`${classes.link} ${
              active === 'characters' ? classes.active : ''
            }`}
            id="characters"
          >
            Characters
          </Link>
          <Link
            to="/locations"
            className={`${classes.link} ${
              active === 'locations' ? classes.active : ''
            }`}
            id="locations"
          >
            Locations
          </Link>
          <Link
            to="/episodes"
            className={`${classes.link} ${
              active === 'episodes' ? classes.active : ''
            }`}
            id="episodes"
          >
            Episodes
          </Link>
        </div>
      </nav>
      {active === 'home' && (
        <div className={classes.home}>
          Please use the navbar links to navigate through different features of
          the website.
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ishansinghcms/refrens"
          >
            Codebase Link
          </a>
        </div>
      )}
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </>
  );
}
