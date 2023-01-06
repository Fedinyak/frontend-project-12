// import axios from 'axios';
import { Formik } from 'formik';
import React
// { useState }
  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// import { io } from 'socket.io-client';
import {
  // ToastContainer,
  toast,
} from 'react-toastify';
import { addNewChannel } from '../../../context/ChatApi';
// import { fetchContent } from '../../../slices/channelsSlice';
// import fetchContent from '../../../context/fetchContent';
// import fetchContent from '../../../context/fetchContent';
// import getAuthHeader from '../../../context/AuthHeader';
// import { getChannels, setCurrentChannelId } from '../../../slices/channelsSlice';
// import { getMessages } from '../../../slices/messagesSlice';
import {
  closedModal,
  // setIsOpenedModal
} from '../../../slices/modalSlice';
import leoProfanity from '../../leoProfanity';

// const socket = io('ws://localhost:3000');

const AddChannelModal = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.modal.entities.isOpened);
  const channels = useSelector((state) => Object.values(state.channels.entities || {}));
  const channelsName = channels.map((channel) => channel.name);
  console.log(channelsName, 'addChannelModal Channels');
  // const [message, setMessage] = useState('');
  // const [show, setShow] = useState(false);
  // const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const schema = Yup.object({
    channelName: Yup.string().min(3, `${t('chat.from3to20Symbols')}`).max(20, `${t('chat.from3to20Symbols')}`).notOneOf(channelsName, `${t('chat.mustBeUnicName')}`),
    // username: Yup.string().min(2, 'Must be 3 characters or more').required('Required'),
  });

  // const handleShow = () => dispatch(setIsOpenedModal(true));

  // const handleChange = (e) => {
  //   // this.setState({ text: e.target.value });
  //   setMessage(e.target.value);
  //   console.log(message, 'message');
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(message, 'submit');
  //   addNewChannel(message);
  //   // socket.emit('newChannel', { name: message });
  //   setMessage('');
  //   // dispatch(fetchContent());
  //   // fetchContent();

  //   dispatch(closedModal());
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(message, 'submit');
  //   socket.emit('newChannel', { name: message });
  //   setMessage('');

  //   // subscribe new channel
  //   socket.on('newChannel', (payload) => {
  //     dispatch(setCurrentChannelId(payload.id));
  //     console.log(payload, 'newChannel'); // { id: 6, name: "new channel", removable: true }
  //     dispatch(getChannels(payload));
  //   });
  //   // const fetchContent = async () => {
  //   //   await axios.get('/api/v1/data', { headers: getAuthHeader() }).then((response) => {
  //   //     dispatch(getChannels(response.data.channels));
  //   //     console.log(response.data.currentChannelId, 'response.data.currentChannelId');
  //   //     // dispatch(setCurrentChannelId(response.data.currentChannelId));
  //   //     dispatch(getMessages(response.data.messages));
  //   //   });
  //   // };

  //   // fetchContent();

  //   dispatch(closedModal());
  // };

  const handleClose = () => dispatch(closedModal());
  // const handleClose = () => dispatch(setIsOpenedModal(true));
  // const [authFailed, setAuthFailed] = useState(false);
  // const [authFailed, setAuthFailed] = useState(true);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Formik
        initialValues={{ channelName: '' }}
        validationSchema={schema}
        onSubmit={(values) => {
          // setAuthFailed(false);
          console.log(values, 'submit');
          addNewChannel(leoProfanity.clean(values.channelName));
          // socket.emit('newChannel', { name: message });
          // dispatch(fetchContent());
          // fetchContent();
          toast.success(t('chat.channelIsCreated'));
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
          isSubmitting,
          /* and other goodies */
        }) => (

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {t('chat.addChannel')}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                noValidate
                // noValidate
                // validated={authFailed}
              >
                <Form.Group hasValidation className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label htmlFor="channelName" className="visually-hidden">
                    {t('chat.channelName')}
                  </Form.Label>
                  <Form.Control
                    // type="channelName"
                    name="channelName"
                    id="channelName"
                    // type="input"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.channelName}
                    // ref={inputRef}
                    // onChange={handleChange}
                    // value={message}
                    placeholder=""
                    autoFocus
                    // isInvalid={authFailed}
                    isInvalid={!!errors.channelName}
                    // isValid={!errors.channelName}
                    // isInvalid={!!errors.channelName}
                    // isInvalid
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.channelName}
                    {/* Должно быть уникальным */}
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
              {/* <Button type="submit" variant="primary" onClick={handleClose}> */}
              <Button type="submit" variant="primary" onClick={handleSubmit}>
                {t('chat.submit')}
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>

  //   <Modal show={show} onHide={handleClose}>
  //     <Modal.Header closeButton>
  //       <Modal.Title>Добавить канал</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <Form
  //         noValidate=""
  //         // onSubmit={handleSubmit}
  //       >
  //         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  //           <Form.Label className="visually-hidden">Имя канала</Form.Label>
  //           <Form.Control
  //             type="input"
  //             onChange={handleChange}
  //             value={message}
  //             placeholder=""
  //             autoFocus
  //           />
  //         </Form.Group>
  //       </Form>
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button variant="secondary" onClick={handleClose}>
  //         Отменить
  //       </Button>
  //       {/* <Button type="submit" variant="primary" onClick={handleClose}> */}
  //       <Button type="submit" variant="primary" onClick={handleSubmit}>
  //         Отправить
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // </>
  );
};

export default AddChannelModal;
