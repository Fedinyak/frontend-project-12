import React from 'react';
import {
  Button,
  // Card, Col,
  Container,
  Navbar,
  // Form, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
// Link,
// useLocation
} from 'react-router-dom';
import useAuth from '../../hooks/auth';

// const AuthButton = () =>
// const auth = useAuth();
// const location = useLocation();
//   // return (
//   //   auth.loggedIn
//   //     ? <Button onClick={auth.logOut} variant="btn btn-primary">Выйти</Button>
//   //     : <></>
//   //     // : <Button variant="btn btn-primary"
//   // as={Link} to="/login" state={{ from: location }}>Log in</Button>
//   // );
//   (
//     <>

//     </>
//   );
const Nav = ({ children }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <div className="h-100 bg-light">

      <div className="d-flex flex-column h-100">
        <Navbar bg="white" className="shadow-sm navbar navbar-expand-lg navbar-light">
          <Container>
            {/* <ul>
              <li>
                <Link to="/login">Login</Link>
              </li> */}
            {/* <li>
              <Link to="/chat">Chat</Link>
            </li> */}
            {/* </ul> */}
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            {/* <Button type="button" variant="btn btn-primary">Выйти</Button> */}
            {auth.loggedIn && (
            <Button onClick={auth.logOut} variant="btn btn-primary">
              {t('chat.signOut')}
            </Button>
            )}
          </Container>

        </Navbar>

        {children}
      </div>
    </div>
  );
};

export default Nav;
