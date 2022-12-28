// import axios from 'axios';
import {
  // Button,
  Col, Container, Row,
} from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Channels from './Channels';
import Messages from './Messages';
// import { addNewChannel } from '../../context/ChatApi';
import { fetchContent } from '../../slices/channelsSlice';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContent());
    // fetchContent();
  }, [dispatch]);

  return (

    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <Channels />
          {/* <Button variant="secondary"
          onClick={() => dispatch(addNewChannel('go'), fetchContent())}>gooo</Button> */}
        </Col>
        <Col className="p-0 h-100">
          <Messages />
        </Col>
      </Row>
    </Container>
  );
};
export default Chat;
