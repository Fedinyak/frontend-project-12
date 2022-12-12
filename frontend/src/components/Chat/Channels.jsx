import React, { useEffect } from 'react';
import axios from 'axios';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { Button } from 'react-bootstrap';
import { getChannels, setCurrentChannelId } from '../../slices/channelsSlice';
import { getMessages } from '../../slices/messagesSlice';

// import plusBtn from '../../assets/plus-channel-btn.svg';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};
const Channels = () => {
  const channels = useSelector((state) => Object.values(state.channels.entities));
  // eslint-disable-next-line max-len
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  // console.log(stateValue, 'stateValue');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      // const { data } = await axios.get('/api/v1/data',
      // { headers: getAuthHeader() }).then((response) => {
      await axios.get('/api/v1/data', { headers: getAuthHeader() }).then((response) => {
        // console.log(response.data, 'response data');
        // => { channels: [...], currentChannelId: 1, messages: [] }
        // dispatch(getChannels(response.data.channels));
        dispatch(getChannels(response.data.channels));
        dispatch(setCurrentChannelId(response.data.currentChannelId));
        dispatch(getMessages(response.data.messages));
      });
      // dispatch(getChannels(data));
      // setContent(data);/
      // console.log(data, 'data');
    };

    fetchContent();
  }, [dispatch]);
  console.log(channels, 'channels');
  console.log(currentChannelId, 'currentChannelId');
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          {/* <img
            src={plusBtn}
            alt="Add channel"
            className="p-0 text-primary btn btn-group-vertical"
          /> */}
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {/* {stateValue.channels.entities.map((item) => ( */}
        {channels.map((item) => {
          const handleClick = (id) => {
            dispatch(setCurrentChannelId(id));
          };
          const styleBtn = currentChannelId === item.id ? 'secondary' : 'light';
          return (
            <li key={item.id} id={item.id} className="nav-item w-100">
              <Button
                type="button"
                variant={styleBtn}
                className="w-100 rounded-0 text-start"
                onClick={() => handleClick(item.id)}
              >
                <span className="me-1">#</span>
                {item.name}
              </Button>
            </li>
          );
        })}

        {/* <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>
            random
          </button>
        </li> */}
      </ul>
      {/* {console.log(stateValue.entities)} */}
      {/* {console.log(stateValue.channels.entities, 'entities')} */}
      {/* {console.log({ stateValue }, 'dfsdf')} */}

    </>
  );
};
export default Channels;
