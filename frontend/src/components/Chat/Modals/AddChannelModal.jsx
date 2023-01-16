import { Formik } from 'formik';
import React, {
  useEffect,
  useRef,
} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import store from '../../../slices/index';
// import { addNewChannel } from '../../../context/ChatApi';
// import ChatApi from '../../../context/ChatApi';
import { closedModal } from '../../../slices/modalSlice';
import useSocket from '../../../hooks/socket';
import { setNewCurrentChannelId } from '../../../slices/channelsSlice';
// import { addNewChannel } from '../../../App';
// import leoProfanity from '../../leoProfanity';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.modal.entities.isOpened);
  const channels = useSelector((state) => Object.values(state.channels.entities || {}));
  const channelsName = channels.map((channel) => channel.name);
  console.log(channelsName, 'addChannelModal Channels');
  const dispatch = useDispatch();
  const inputRef = useRef();
  const ChatApi = useSocket();
  const currentChannelId = useSelector((state) => state.channels.newChannelId);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = Yup.object({
    channelName: Yup.string().min(3, `${t('chat.from3to20Symbols')}`).max(20, `${t('chat.from3to20Symbols')}`).notOneOf(channelsName, `${t('chat.mustBeUnicName')}`),
  });

  const handleClose = () => dispatch(closedModal());

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={schema}
      onSubmit={async (values) => {
        try {
          console.log(values, 'submit');
          await ChatApi.addNewChannel(leoProfanity.clean(values.channelName));
          // const currentChannelId = useSelector((state) => state.channels.newChannelId);
          // addNewChannel(leoProfanity.clean(values.channelName));
          // eslint-disable-next-line no-unused-expressions
          console.log(currentChannelId, 'idddddddddddd');
          console.log(store.getState(), 'idddddddddddd getState');

          await dispatch(setNewCurrentChannelId());
          toast.success(t('chat.channelIsCreated'));
          dispatch(closedModal());
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {t('chat.addChannel')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={handleSubmit}
              noValidate
            >
              <Form.Group hasValidation className="mb-3">
                <Form.Label htmlFor="channelName" className="visually-hidden">
                  {t('chat.channelName')}
                </Form.Label>
                <Form.Control
                  name="channelName"
                  id="channelName"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.channelName}
                  ref={inputRef}
                  placeholder=""
                  autoFocus
                  isInvalid={!!errors.channelName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.channelName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              type="submit"
              disabled={isSubmitting}
            >
              {t('chat.cancel')}
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              {t('chat.submit')}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default AddChannelModal;
