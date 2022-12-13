import React from 'react';
import {
  useDispatch,
} from 'react-redux';
import { Button } from 'react-bootstrap';
import { setCurrentChannelId } from '../../slices/channelsSlice';

const Channel = ({ item, currentChannelId }) => {
  const dispatch = useDispatch();
  const { id, name } = item;
  const handleClick = (currentId) => {
    dispatch(setCurrentChannelId(currentId));
  };
  const styleBtn = currentChannelId === id ? 'secondary' : 'light';

  return (
    <li key={id} id={id} className="nav-item w-100">
      <Button
        type="button"
        variant={styleBtn}
        className="w-100 rounded-0 text-start"
        onClick={() => handleClick(id)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
};
export default Channel;
