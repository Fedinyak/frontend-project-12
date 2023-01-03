// import { useMemo, useState } from 'react';
import { useMemo, useState } from 'react';
import AuthContext from './AuthContext';

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(false);
//   const userAuth = useMemo(() => ({ auth, setAuth }), [auth]);
//   console.log(auth, 'authProvider');

//   return (
//     <AuthContext.Provider value={userAuth}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const loginedInState = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={loginedInState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
