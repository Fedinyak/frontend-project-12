import {
  Routes, Route,
  // Link,
  Navigate,
  useLocation,
  // redirect,
  // useNavigate,
} from 'react-router-dom';
// import {
//   useContext,
//   // useEffect,
// } from 'react';
// import { useEffect } from 'react';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import AuthProvider from './context/AuthProvider';
import Chat from './components/Chat/Chat';
import Nav from './components/Nav/Nav';
// import AuthContext from './context/AuthContext';
// const getAuthHeader = () => {
//   const userId = JSON.parse(localStorage.getItem('token'));
//   if (userId && userId.token) {
//     return { Authorization: `Bearer ${userId.token}` };
//   }

//   return {};
// };

// const getAuthHeader = () => {
//   const userId = JSON.parse(localStorage.getItem('userId'));

//   if (userId && userId.token) {
//     return { Authorization: `Bearer ${userId.token}` };
//   }

//   return {};
// };

// const PrivateRoute = ({ children }) => {
//   const auth = useAuth();
//   const location = useLocation();

//   return (
//     auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
//   );
// };

const LoginWrap = ({ children }) => {
  const location = useLocation();

  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Nav>
    </AuthProvider>
  </div>
);
export default App;

// const App = () =>
//   // const isAuth = JSON.parse(localStorage.getItem('token'));
//   // const { auth, setAuth } = useContext(AuthContext);
//   // const isAuth = auth;
//   // console.log(isAuth, 'isAuthhhhh');
//   // console.log(setAuth, 'authhhhh');
//   // const navigate = useNavigate();
//   // useEffect(() => {
//   //   if (isAuth === false) {
//   //     // navigate('/login');
//   //     redirect('/login');
//   //   }
//   // }, [isAuth]);
//   // if (isAuth === false) {
//   //   redirect('/login');
//   // }
//   // const TryRedirect = () => {
//   //   if (isAuth === false) {
//   //     return redirect('/login');
//   //   }
//   // };
//   return (
//     <div>
//       {/* <button type="submit" onClick={() => setAuth(!auth)}>
//         setAuth
//         {' '}
//         {`${auth}`}
//         {' '}
//       </button> */}

//       <div className="App">
//         <ul>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//         </ul>
//         <AuthProvider>
//           <Routes>

//             <Route path="/">
//               {/* {isAuth && navigate('/login')} */}
//               <Route path="/login" element={<Login />} />
//               <Route path="*" element={<NotFound />} />
//             </Route>
//           </Routes>
//         </AuthProvider>
//       </div>

//     </div>
//   );
// export default App;
