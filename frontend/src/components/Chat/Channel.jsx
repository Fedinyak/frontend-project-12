import React from 'react';
import {
  useDispatch,
} from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import { io } from 'socket.io-client';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  // getChannels,
  setCurrentChannelId,
} from '../../slices/channelsSlice';
// import getAuthHeader from '../../context/AuthHeader';
// import { getMessages } from '../../slices/messagesSlice';
// import RemoveChannelModal from './Modals/RemoveChannelModal';
import { openedModal } from '../../slices/modalSlice';

// const socket = io('ws://localhost:3000');

const Channel = ({ item, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = item;
  const handleClick = (currentId) => {
    dispatch(setCurrentChannelId(currentId));
  };
  const styleBtn = currentChannelId === id ? 'secondary' : 'light';

  const handleRemoveChannel = (e) => {
    dispatch(openedModal({ isOpened: true, type: 'removeChannel', channelId: e.target.id }));
    // const channelId = e.target.id;
    // // subscribe remove channel
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
  };

  const handleRenameChannel = (e) => {
    dispatch(openedModal({ isOpened: true, type: 'renameChannel', channelId: e.target.id }));
  };

  return (

    <li key={id} id={id} className="nav-item w-100">
      {/* <RemoveChannelModal /> */}
      {removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={styleBtn}
            className="w-100 rounded-0 text-start text-truncate btn btn-secondary"
            onClick={() => handleClick(id)}
          >
            <span className="me-1">#</span>
            {name}

          </Button>

          <Dropdown.Toggle
            split
            variant={styleBtn}
            id="dropdown-split-basic"
            aria-expanded="false"
          >
            <span className="visually-hidden">{t('chat.channelControl')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item id={id} onClick={handleRemoveChannel}>{t('chat.delete')}</Dropdown.Item>
            <Dropdown.Item id={id} onClick={handleRenameChannel}>{t('chat.channelRename')}</Dropdown.Item>
          </Dropdown.Menu>
          {/* <div role="group" className="d-flex dropdown btn-group">
            <Button
              type="button"
              variant={styleBtn}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={() => handleClick(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            <Button
              type="button"
              variant={styleBtn}
              // id="react-aria5628028882-1"
              aria-expanded="false"
              className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
            >
              <span className="visually-hidden">Управление каналом</span>
            </Button> */}
          {/* <div x-placement="bottom-start"
            aria-labelledby="react-aria5628028882-4"
            className="dropdown-menu show" data-popper-reference-hidden="false"
            data-popper-escaped="false" data-popper-placement="bottom-start"
            style="position: absolute; inset: 0px auto auto 0px;
            transform: translate3d(73.5px, 40px, 0px);">
            <a data-rr-ui-dropdown-item=""
            className="dropdown-item" role="button" tabIndex="0" href="#">Удалить</a>
            <a data-rr-ui-dropdown-item=""
            className="dropdown-item" role="button" tabIndex="0" href="#">Переименовать</a>

          </div> */}
          {/* </div> */}
        </Dropdown>

      ) : (
        <Button
          type="button"
          variant={styleBtn}
          className="w-100 rounded-0 text-start"
          onClick={() => handleClick(id)}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      )}
    </li>
  );
};
export default Channel;
