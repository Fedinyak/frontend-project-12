import React, {
  useContext,
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channel from './Channel';
import Modal from './Modals/Modal';
import { openedModal } from '../../slices/modalSlice';
import SwitchIdContext from '../../context/SwitchIdContext';
import { setNewChannelId } from '../../slices/channelsSlice';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => Object.values(state.channels.entities || {}));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const newChannelId = useSelector((state) => state.channels.newChannelId);
  const dispatch = useDispatch();
  const switchNewChannelIdState = useContext(SwitchIdContext);
  console.log(switchNewChannelIdState.channelNewId, 'switchNewChannelIdState.switchChannelId');

  useEffect(() => {
    if (switchNewChannelIdState.channelNewId) {
      console.log(newChannelId, 'newChannelId');
      dispatch(setNewChannelId());
      switchNewChannelIdState.dontSwitchChannelNewId();
    }
  }, [newChannelId]);

  const addChannel = () => {
    dispatch(openedModal({ isOpened: true, type: 'addChannel' }));
  };

  return (
    <>
      <Modal />
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>
          {t('chat.channels')}
        </span>
        <button type="button" onClick={addChannel} className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((item) => (
          <Channel
            key={item.id}
            item={item}
            currentChannelId={currentChannelId}
          />
        ))}
      </ul>
    </>
  );
};
export default Channels;
