// import axios from 'axios';
import {
  // Button,
  Col, Container, Row,
} from 'react-bootstrap';
import Channels from './Channels';
import Messages from './Messages';

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
export default Chat;
