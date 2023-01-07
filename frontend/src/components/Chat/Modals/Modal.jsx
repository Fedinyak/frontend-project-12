import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Modal = () => {
  const [, type] = useSelector((state) => Object.values(state.modal.entities || {}));
  switch (type) {
    case 'addChannel':
      return <AddChannelModal />;
    case 'removeChannel':
      return <RemoveChannelModal />;
    case 'renameChannel':
      return <RenameChannelModal />;
    // eslint-disable-next-line no-unused-expressions
    default: null;
  }
  return null;
};

export default Modal;
