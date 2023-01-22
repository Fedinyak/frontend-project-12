import { useMemo, useState } from 'react';
import AuthContext from './AuthContext';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  // return {};
  return false;
};

const AuthProvider = ({ children }) => {
  // const user = JSON.parse(localStorage.getItem('userId'));
  const user = getAuthHeader();
  console.log(user, 'userId');
  const [loggedIn, setLoggedIn] = useState(user ? true : null);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const loginedInState = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={loginedInState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
