import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import PropTypes from 'prop-types';

const Rating = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
};
