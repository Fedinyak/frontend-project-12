// import axios from 'axios';
import {
  // Button,
  Col, Container, Row,
} from 'react-bootstrap';
// import {
//   useSelector,
//   useDispatch,
// } from 'react-redux';
// import { useEffect } from 'react';
import Channels from './Channels';
import Messages from './Messages';
// import TestCounter from '../../redux/slices/TestCounter';
// import React, { useEffect, useState } from 'react';
// import { decrement, increment } from '../slices/counterSlice.js';
// import { getChannels } from '../../slices/channelsSlice';

// const Chat = async () => {
//   // try {
//   //   const response = await axios.post('/api/v1/login');
//   //   console.log(response, 'response Login');
//   //   localStorage.setItem('userId', JSON.stringify(response.data));
//   // } catch (error) {
//   //   console.error(error);
//   //   if (error.isAxiosError && error.response.status === 401) {
//   //     return;
//   //   }
//   //   throw error;
//   // }
//   axios.get('/api/v1/data').then((response) => {
//     console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
//   });
//   // return (<p>Chat page</p>);
// };

const Chat = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
        <Channels />
      </Col>
      <Col className="p-0 h-100">
        <Messages />
      </Col>
    </Row>
  </Container>
);
// // BEGIN
//   const [content, setContent] = useState('');
//   useEffect(() => {
//     const fetchContent = async () => {
//       const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
//       setContent(data);
//     };

//     fetchContent();
//   }, []);

//   return content && <p>{content}</p>;
// END

export default Chat;
