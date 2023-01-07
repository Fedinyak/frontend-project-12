import {
  Routes, Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useContext } from 'react';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import AuthProvider from './context/AuthProvider';
import Chat from './components/Chat/Chat';
import Nav from './components/Nav/Nav';
import SignUp from './components/Login/SignUp';
import AuthContext from './context/AuthContext';

const LoginWrap = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  console.log(auth, 'auth');
  console.log(auth.loggedIn, 'auth.loggedIn');

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="h-100">

    <AuthProvider>
      <Nav>
        <Routes>
          <Route path="/">
            <Route
              path="/"
              element={
                <LoginWrap><Chat /></LoginWrap>
            }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Nav>
    </AuthProvider>
  </div>
);
export default App;
