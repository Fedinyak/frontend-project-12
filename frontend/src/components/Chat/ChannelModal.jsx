import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import getAuthHeader from '../../context/AuthHeader';
import { getChannels, setCurrentChannelId } from '../../slices/channelsSlice';
import { getMessages } from '../../slices/messagesSlice';
import { setIsOpenedModal } from '../../slices/modalSlice';

const socket = io('ws://localhost:3000');

const ChannelModal = () => {
  const show = useSelector((state) => state.modal.isOpened);
  const [message, setMessage] = useState('');
  // const [show, setShow] = useState(false);
  // const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  // const handleShow = () => dispatch(setIsOpenedModal(true));

  const handleChange = (e) => {
    // this.setState({ text: e.target.value });
    setMessage(e.target.value);
    console.log(message, 'message');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message, 'submit');
    socket.emit('newChannel', { name: message });
    setMessage('');

    // subscribe new channel
    socket.on('newChannel', (payload) => {
      console.log(payload, 'newChannel'); // { id: 6, name: "new channel", removable: true }
    });

    const fetchContent = async () => {
      await axios.get('/api/v1/data', { headers: getAuthHeader() }).then((response) => {
        dispatch(getChannels(response.data.channels));
        dispatch(setCurrentChannelId(setCurrentChannelId));
        dispatch(getMessages(response.data.messages));
      });
    };

    fetchContent();

    dispatch(setIsOpenedModal(false));
  };

  const handleClose = () => dispatch(setIsOpenedModal(false));
  // const handleClose = () => dispatch(setIsOpenedModal(true));

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate=""
            // onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="visually-hidden">Имя канала</Form.Label>
              <Form.Control
                type="input"
                onChange={handleChange}
                value={message}
                placeholder=""
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          {/* <Button type="submit" variant="primary" onClick={handleClose}> */}
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChannelModal;
