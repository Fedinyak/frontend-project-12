// import axios from 'axios';
import { Formik } from 'formik';
import React
// { useState }
  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { renameChannel } from '../../../context/ChatApi';
import {
  closedModal,
} from '../../../slices/modalSlice';
import leoProfanity from '../../leoProfanity';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.modal.entities.isOpened);
  const channelId = useSelector((state) => state.modal.entities.channelId);
  const channels = useSelector((state) => Object.values(state.channels.entities || {}));
  const channelsName = channels.map((channel) => channel.name);
  // const [text, setText] = useState('');
  const dispatch = useDispatch();

  const schema = Yup.object({
    channelName: Yup.mixed().notOneOf(channelsName, `${t('chat.mustBeUnicName')}`),
  });

  // const handleChange = (e) => {
  //   // this.setState({ text: e.target.value });
  //   setText(e.target.value);
  //   console.log(text, 'textRename');
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(text, 'submitRename');
  //   console.log(channelId, '---id: e.target.id');

  //   renameChannel({ id: channelId, name: text });
  //   setText('');
  //   dispatch(closedModal());
  // };

  const handleClose = () => dispatch(closedModal());

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={schema}
      onSubmit={(values) => {
      // setAuthFailed(false);
        console.log(values, 'submit');
        renameChannel({ id: channelId, name: leoProfanity.clean(values.channelName) });
        toast.success(t('chat.channelIsRenamed'));
        // addNewChannel(values.channelName);
        // socket.emit('newChannel', { name: message });
        // dispatch(fetchContent());
        // fetchContent();
        dispatch(closedModal());
      // try {
      //   const response = await axios.post('/api/v1/login', values);
      //   console.log(response, 'response Login');
      //   localStorage.setItem('userId', JSON.stringify(response.data));
      //   auth.logIn();
      //   const { from } = location.state || { from: { pathname: '/' } };
      // } catch (error) {
      //   console.error(error);
      //   setSubmitting(false);
      //   // formik.setSubmitting(false);
      //   if (error.isAxiosError && error.response.status === 401) {
      //     setAuthFailed(true);
      //     inputRef.current.select();
      //     return;
      //   }
      //   throw error;
      // }
      }}
    >
      {({
        values,
        errors,
        // touched,
        handleChange,
        handleBlur,
        handleSubmit,
        // isSubmitting,
      /* and other goodies */
      }) => (

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              noValidate
            >
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Button variant="secondary" onClick={handleClose}>
              {t('chat.cancel')}
            </Button>
            {/* <Button type="submit" variant="primary" onClick={handleClose}> */}
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              {t('chat.submit')}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameChannelModal;
