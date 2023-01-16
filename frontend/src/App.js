import {
  Routes, Route,
  Navigate,
  useLocation,

  BrowserRouter as Router,
} from 'react-router-dom';
import { useContext } from 'react';
// import leoProfanity from 'leo-profanity';
// import { io } from 'socket.io-client';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import AuthProvider from './context/AuthProvider';
import Chat from './components/Chat/Chat';
import Nav from './components/Nav/Nav';
import SignUp from './components/Login/SignUp';
import AuthContext from './context/AuthContext';
import routesPath from './routes';
// import store from './slices/index';
// import { addMessage } from './slices/messagesSlice';
// import {
//   addChannel, deleteChannel, setCurrentChannelId, updateChannel,
// } from './slices/channelsSlice';

const LoginWrap = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  console.log(auth, 'auth');
  console.log(auth.loggedIn, 'auth.loggedIn');

  return (
    auth.loggedIn ? children
      : <Navigate to={routesPath.loginPagePath()} state={{ from: location }} />
  );
};

// const socket = io();

// export const newMessage = ({ body, channelId, username }) => {
//   console.log(body, channelId, username, 'usernam');
//   socket.emit('newMessage', { body, channelId, username });

//   socket.on('newMessage', (payload) => {
//     console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
//     store.dispatch(addMessage(payload));
//   });
// };

// export const addNewChannel = (name) => {
//   socket.emit('newChannel', { name });
//   console.log(name, 'naaaaaame');

//   socket.on('newChannel', (payload) => {
//     console.log(payload, '1 neeeeeew');

//     store.dispatch(setCurrentChannelId(payload.id));
//     store.dispatch(addChannel(payload));
//     console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
//   });
// };

// export const removeChannel = (id) => {
//   console.log(id, 'rem');
//   socket.emit('removeChannel', { id });

//   socket.on('removeChannel', (payload) => {
//     console.log(payload, 'removeChan payload'); // { id: 6 };
//     store.dispatch(deleteChannel(payload));
//   });
// };

// export const renameChannel = ({ id, name }) => {
//   socket.emit('renameChannel', { id, name });
//   socket.on('renameChannel', (payload) => {
//     console.log(
//       { id: payload.id, changes: payload.name },
//       'renameChan payload',
//     ); // { id: 7, name: "new name channel", removable: true }
//     store.dispatch(updateChannel({ id: payload.id, changes: payload }));
//   });
// };

const App = () => (
  <div className="h-100">

    <AuthProvider>
      <Router>

        <Nav>
          <Routes>
            <Route path={routesPath.mainPagePath()}>
              <Route
                path={routesPath.mainPagePath()}
                element={
                  <LoginWrap><Chat /></LoginWrap>
                }
              />
              <Route path={routesPath.loginPagePath()} element={<Login />} />
              <Route path={routesPath.signupPagePath()} element={<SignUp />} />
              <Route path={routesPath.notFoundPagePath()} element={<NotFound />} />
            </Route>
          </Routes>
        </Nav>
      </Router>
    </AuthProvider>
  </div>
);
export default App;
