import React from 'react';
import {
  Button,
  // Card, Col,
  Container,
  Navbar,
  // Form, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nav = ({ children }) => (
  <div className="h-100 bg-light">

    <div className="d-flex flex-column h-100">
      <Navbar bg="white" className="shadow-sm navbar navbar-expand-lg navbar-light">
        <Container>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/chat">Chat</Link>
            </li> */}
          </ul>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          <Button type="button" variant="btn btn-primary">Выйти</Button>
        </Container>

      </Navbar>

      {children}
    </div>
  </div>
);

export default Nav;
