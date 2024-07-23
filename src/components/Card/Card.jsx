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
      className={classes.container}
      key={item.id}
    >
      <img src={item.image} alt={`${item.name}`} />
      <p>{item.name}</p>
    </div>
  );
});

export default Card;
