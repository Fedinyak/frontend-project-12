import {
  Routes, Route,
  Navigate,
  useLocation,
  BrowserRouter as Router,
} from 'react-router-dom';
import { useContext } from 'react';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import AuthProvider from './context/AuthProvider';
import Chat from './components/Chat/Chat';
import Nav from './components/Nav/Nav';
import SignUp from './components/Login/SignUp';
import AuthContext from './context/AuthContext';
import routesPath from './routes';

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
