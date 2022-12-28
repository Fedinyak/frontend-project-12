// import RemoveChannelModal from './RemoveChannelModal';
import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Modal = () => {
  // const [isOpened, type] = useSelector((state) => Object.values(state.modal.entities || {}));
  const [, type] = useSelector((state) => Object.values(state.modal.entities || {}));
  // console.log(isOpened, 'isOpened');
  // console.log(type, 'type');
  // console.log(modalState.isOpen, 'isOpened');
  switch (type) {
    case 'addChannel':
      return <AddChannelModal />;
    case 'removeChannel':
      return <RemoveChannelModal />;
    case 'renameChannel':
      return <RenameChannelModal />;
    // eslint-disable-next-line no-unused-expressions
    // eslint-disable-next-line no-unused-expressions
    default: null;
  }
  // if (type === 'addChannel') { return <AddChannelModal />; }
  return null;
};

export default Modal;
