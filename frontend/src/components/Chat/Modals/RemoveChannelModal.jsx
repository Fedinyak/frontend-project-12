import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSocket from '../../../hooks/socket';
import { closedModal } from '../../../slices/modalSlice';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.modal.entities.isOpened);
  const channelId = useSelector((state) => state.modal.entities.channelId);
  const dispatch = useDispatch();
  const ChatApi = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(channelId, 'channelId rem');
    ChatApi.removeChannel(channelId);
    // removeChannel(channelId);
    toast.success(t('chat.channelIsDeleted'));
    dispatch(closedModal());
  };

  return (
    <Modal show={show} onHide={() => dispatch(closedModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.channelRemove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('chat.channelAgree')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closedModal())}>
          {t('chat.cancel')}
        </Button>
        <Button type="submit" variant="danger" onClick={handleSubmit}>
          {t('chat.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
