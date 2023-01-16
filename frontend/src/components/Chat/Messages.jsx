import React, {
  useEffect,
  useRef,
} from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Element, scroller } from 'react-scroll';
// import leoProfanity from '../leoProfanity';
import leoProfanity from 'leo-profanity';
import useSocket from '../../hooks/socket';
// eslint-disable-next-line import/no-cycle
// import { newMessage } from '../../App';
// import { newMessage } from '../../context/ChatApi';
// import ChatApi from '../../context/ChatApi';
// import * as Scroll from 'react-scroll';
// import { Link, Button, Element, Events,
// animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const Messages = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => Object.values(state.channels.entities || {}));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channelTitle = channels.filter((channel) => channel.id === currentChannelId);
  const allMessages = useSelector((state) => Object.values(state.messages.entities || {}));
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);
  const localStorateItem = JSON.parse(localStorage.getItem('userId'));
  const { username } = localStorateItem;
  const inputRef = useRef();
  const ChatApi = useSocket();

  const messagesCount = (messagesInChannel) => {
    if (messagesInChannel.length - 1 === -1) {
      return 0;
    }
    return messagesInChannel.length;
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  useEffect(() => {
    scroller.scrollTo('messageScrollElement', {
      // duration: 100,
      // delay: 100,
      // smooth: true,
      containerId: 'messages-box',
      // offset: 50, // Scrolls to element + 50 pixels down the page
    });
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channelTitle.map((channel) => channel.name)}`}</b>
        </p>
        <span className="text-muted">
          {`${messagesCount(messages)} ${t('chat.messageCount')}`}
        </span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5 ">

        {messages.map((item) => (
          <div key={item.id} className="text-break mb-2">
            <b>{item.username}</b>
            {`: ${item.body}`}
          </div>
        ))}
        <Element name="messageScrollElement" />
      </div>
      <div className="mt-auto px-5 py-3">
        <Formik
          initialValues={{ body: '' }}
          onSubmit={(values, { resetForm }) => {
            console.log(values, '-message, -currentChannelId, -username.username');

            const filterMessage = leoProfanity.clean(values.body);

            ChatApi.newMessage(
            // newMessage(
              {
                body: filterMessage,
                channelId: currentChannelId,
                username,
              },
            );
            console.log(values.body, 'meeeeessageeees');
            resetForm();
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
          }) => (
            <Form
              noValidate
              className="py-1 border rounded-2"
              onSubmit={handleSubmit}
            >
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="body"
                  id="body"
                  aria-label={t('chat.newMessage')}
                  placeholder={t('chat.enterMessage')}
                  className="border-0 p-0 ps-2"
                  onChange={handleChange}
                  autoComplete="off"
                  ref={inputRef}
                  value={values.body}
                />
                <Form.Label htmlFor="body" className="visually-hidden">
                  {t('chat.newMessage')}
                </Form.Label>
                <Button type="submit" variant="link" className="btn-group-vertical" disabled="">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                  <span className="visually-hidden">
                    {t('chat.submit')}
                  </span>
                </Button>
              </InputGroup>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Messages;
