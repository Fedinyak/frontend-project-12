// import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannel } from '../../../context/ChatApi';
import {
  closedModal,
} from '../../../slices/modalSlice';

const RenameChannelModal = () => {
  const show = useSelector((state) => state.modal.entities.isOpened);
  const channelId = useSelector((state) => state.modal.entities.channelId);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // this.setState({ text: e.target.value });
    setText(e.target.value);
    console.log(text, 'textRename');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text, 'submitRename');
    console.log(channelId, '---id: e.target.id');

    renameChannel({ id: channelId, name: text });
    setText('');
    dispatch(closedModal());
  };

  const handleClose = () => dispatch(closedModal());

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate=""
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control
              type="input"
              onChange={handleChange}
              value={text}
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
  );
};

export default RenameChannelModal;
