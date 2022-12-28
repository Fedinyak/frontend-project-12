// import axios from 'axios';
import React, {
  // useEffect,
  useState,
} from 'react';
import { Form } from 'react-bootstrap';
import {
  // useDispatch,
  useSelector,
  // useDispatch,
} from 'react-redux';
// import { io } from 'socket.io-client';
import { newMessage } from '../../context/ChatApi';
// import { fetchMessages } from '../../slices/messagesSlice';
// import { fetchContent } from '../../slices/messagesSlice';
// import { fetchContent } from '../../slices/channelsSlice';
// import getAuthHeader from '../../context/AuthHeader';
// import { getChannels, setCurrentChannelId } from '../../slices/channelsSlice';
// import { getMessages } from '../../slices/messagesSlice';

// const socket = io('ws://localhost:3000');

// const getAuthHeader = () => {
//   const userId = JSON.parse(localStorage.getItem('userId'));

//   if (userId && userId.token) {
//     return { Authorization: `Bearer ${userId.token}` };
//   }

//   return {};
// };

const Messages = () => {
  const channels = useSelector((state) => Object.values(state.channels.entities || {}));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channelTitle = channels.filter((channel) => channel.id === currentChannelId);
  const allMessages = useSelector((state) => Object.values(state.messages.entities || {}));
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);
  const localStorateItem = JSON.parse(localStorage.getItem('userId'));
  const { username } = localStorateItem;

  const [message, setMessage] = useState('');
  // const dispatch = useDispatch();

  const messagesCount = (messagesInChannel) => {
    if (messagesInChannel.length - 1 === -1) {
      return 0;
    }
    return messagesInChannel.length;
  };
  // console.log(channels, currentChannelId, 'dfdf');

  const handleSubmit = (e) => {
    e.preventDefault();
    // subscribe new messages
    // socket.on('newMessage', (payload) => {
    //   console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    // });
    // // emit new message
    // socket.emit('newMessage',
    // { body: message, channelId: currentChannelId, username: username.username });

    // const fetchContent = async () => {
    //   await axios.get('/api/v1/data', { headers: getAuthHeader() }).then((response) => {
    //     dispatch(getChannels(response.data.channels));
    //     // dispatch(setCurrentChannelId(response.data.currentChannelId));
    //     dispatch(setCurrentChannelId(currentChannelId));
    //     dispatch(getMessages(response.data.messages));
    //   });
    // };
    console.log(username, '-message, -currentChannelId, -username.username');
    // dispatch(newMessage(
    //   {
    //     body: message,
    //     channelId: currentChannelId,
    //     username,
    //   },
    // ));
    newMessage(
      {
        body: message,
        channelId: currentChannelId,
        username,
      },
    );
    console.log(message, 'meeeeessageeees');
    setMessage('');
    // dispatch(fetchMessages());
  };

  const handleChange = (e) => {
    // this.setState({ text: e.target.value });
    setMessage(e.target.value);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channelTitle.map((channel) => channel.name)}`}</b>
        </p>
        <span className="text-muted">
          {`${messagesCount(messages)}  сообщений`}
        </span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5 ">

        {messages.map((item) => (
          <div key={item.id} className="text-break mb-2">
            <b>{item.username}</b>
            {`: ${item.body}`}
          </div>
        ))}

      </div>
      <div className="mt-auto px-5 py-3">
        <Form
          noValidate=""
          className="py-1 border rounded-2"
          onSubmit={handleSubmit}
        >
          <div className="input-group has-validation">
            <input
              name="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
              onChange={handleChange}
              value={message}
            />
            <button type="submit" className="btn btn-group-vertical" disabled="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default Messages;
