import {
  Col, Container, Row,
} from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import Channels from './Channels';
import Messages from './Messages';
import routes from '../../routes';
import {
  addChannels, setCurrentChannelId,
} from '../../slices/channelsSlice';
import {
  addMessages,
} from '../../slices/messagesSlice';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchContent());
    // eslint-disable-next-line consistent-return
    const fetchContent = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const headers = { Authorization: `Bearer ${userId.token}` };
        const response = await axios.get(routes.dataPath(), { headers });
        console.log(response.data, 'response.data');
        dispatch(addChannels(response.data.channels));
        dispatch(addMessages(response.data.messages));
        dispatch(setCurrentChannelId(response.data.currentChannelId));
        return response.data;
      } catch (error) {
        toast.success(error.response.status);
      }
    };
    fetchContent();
  });

  return (

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
};
export default Chat;
