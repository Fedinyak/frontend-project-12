import { Formik } from 'formik';
import React, {
  useContext,
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
import { closedModal } from '../../../slices/modalSlice';
import useSocket from '../../../hooks/socket';
import SwitchIdContext from '../../../context/SwitchIdContext';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.modal.entities.isOpened);
  const channels = useSelector((state) => Object.values(state.channels.entities || {}));
  const channelsName = channels.map((channel) => channel.name);
  console.log(channelsName, 'addChannelModal Channels');
  const dispatch = useDispatch();
  const inputRef = useRef();
  const ChatApi = useSocket();
  const newChannelId = useSelector((state) => state.channels.newChannelId);
  const switchNewChannelIdState = useContext(SwitchIdContext);

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
      onSubmit={(values) => {
        console.log(values, 'submit');
        ChatApi.addNewChannel(leoProfanity.clean(values.channelName));
        toast.success(t('chat.channelIsCreated'));
        console.log(store.getState(), 'store.getState');
        // dispatch(setNewChannelId());
        console.log(newChannelId, 'newChannelId');
        switchNewChannelIdState.doSwitchChannelNewId();
        dispatch(closedModal());
        // addNewChannelIdText();
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
