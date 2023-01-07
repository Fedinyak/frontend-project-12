import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../../slices/channelsSlice';
import { openedModal } from '../../slices/modalSlice';

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
  };

  const handleRenameChannel = (e) => {
    dispatch(openedModal({ isOpened: true, type: 'renameChannel', channelId: e.target.id }));
  };

  return (

    <li key={id} id={id} className="nav-item w-100">
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
