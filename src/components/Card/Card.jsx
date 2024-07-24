import PropTypes, { string } from 'prop-types';
import classes from './style.module.css';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = forwardRef(({ item }, ref) => {
  const navigate = useNavigate();
  const handeClick = (id) => {
    navigate(`${id}`);
  };
  return (
    <div
      onClick={() => {
        handeClick(item.id);
      }}
      ref={ref}
      className={`${classes.container} ${
        !item.image ? classes.location_card : ''
      }`}
      key={item.id}
    >
      {item.image && <img src={item.image} alt={`${item.name}`} />}
      <p className={classes.location_name}>{item.name}</p>
      {!item.image && item.residents && (
        <p>{`${item.residents.length} residents`}</p>
      )}
      {!item.image && item.characters && (
        <p>{`${item.characters.length} featured characters`}</p>
      )}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    residents: PropTypes.arrayOf(string),
    characters: PropTypes.arrayOf(string),
  }).isRequired,
};

export default Card;
