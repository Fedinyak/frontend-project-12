// import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
// import getAuthHeader from '../../../context/AuthHeader';
import { removeChannel } from '../../../context/ChatApi';
// import { getChannels, setCurrentChannelId } from '../../../slices/channelsSlice';
// import { getMessages } from '../../../slices/messagesSlice';
import {
  // openedModal,
  closedModal,
} from '../../../slices/modalSlice';

// const socket = io('ws://localhost:3000');

const RemoveChannelModal = () => {
  // const show = useSelector((state) => state.modal.isOpened);
  const show = useSelector((state) => state.modal.entities.isOpened);
  const channelId = useSelector((state) => state.modal.entities.channelId);
  // const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(channelId, 'channelId rem');
    removeChannel(channelId);
    // const channelId = e.target.id;
    // subscribe remove channel
    // socket.on('removeChannel', (payload) => {
    //   console.log(payload); // { id: 6 };
    // });
    // // emit remove channel
    // socket.emit('removeChannel', { id: channelId });

    // const fetchContent = async () => {
    //   await axios.get('/api/v1/data', { headers: getAuthHeader() }).then((response) => {
    //     dispatch(getChannels(response.data.channels));
    //     dispatch(setCurrentChannelId(1));
    //     dispatch(getMessages(response.data.messages));
    //   });
    // };

    // fetchContent();
    // console.log(e.target.id, 'e.target');

    // fetchContent();

    dispatch(closedModal());
    // dispatch(openedModal(false));
  };

  // const handleClose = () => dispatch(closedModal());
  // const handleClose = () => dispatch(setIsOpenedModal(true));

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal show={show} onHide={() => dispatch(closedModal())}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Уверены?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closedModal())}>
            Отменить
          </Button>
          {/* <Button type="submit" variant="primary" onClick={handleClose}> */}
          <Button type="submit" variant="danger" onClick={handleSubmit}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannelModal;
