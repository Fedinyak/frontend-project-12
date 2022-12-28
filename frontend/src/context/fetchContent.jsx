import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getChannels } from '../slices/channelsSlice';
import { getMessages } from '../slices/messagesSlice';
import getAuthHeader from './AuthHeader';

const fetchContent = async () => {
  await axios.get('/api/v1/data', { headers: getAuthHeader() }).then((response) => {
    const dispatch = useDispatch();
    dispatch(getChannels(response.data.channels));
    dispatch(getMessages(response.data.messages));
  });
};

export default fetchContent;
