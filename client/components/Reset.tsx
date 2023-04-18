import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../slices/gameSlice';

const Reset = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <div>
      <button onClick={handleReset}>
        <span>reset</span>
      </button>
    </div>
  );
};

export default Reset;
