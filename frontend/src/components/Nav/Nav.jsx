import React from 'react';
import {
  Button,
  Container,
  Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
} from 'react-router-dom';
import useAuth from '../../hooks/auth';

const Nav = ({ children }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <div className="h-100 bg-light">

      <div className="d-flex flex-column h-100">
        <Navbar bg="white" className="shadow-sm navbar navbar-expand-lg navbar-light">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
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
