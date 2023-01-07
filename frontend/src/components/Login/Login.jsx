import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Button, Card, Col, Container, Form, Row,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginImg from '../../assets/login.jpeg';
import useAuth from '../../hooks/auth';
import routes from '../../routes';

const schema = Yup.object({
});

const Login = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Card.Img src={loginImg} className="rounded-circle" alt="Войти" />
              </Col>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                  setAuthFailed(false);
                  try {
                    const response = await axios.post(routes.loginPath(), values);
                    console.log(response, 'response Login');
                    localStorage.setItem('userId', JSON.stringify(response.data));
                    auth.logIn();
                    const { from } = location.state || { from: { pathname: '/' } };
                    navigate(from);
                  } catch (error) {
                    console.error(error);
                    setSubmitting(false);
                    if (error.isAxiosError && error.response.status === 401) {
                      setAuthFailed(true);
                      inputRef.current.select();
                      return;
                    }
                    throw error;
                  }
                }}

              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">{t('chat.enter')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="username"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className="form-control"
                        ref={inputRef}
                        isInvalid={authFailed}
                      />
                      <Form.Label htmlFor="username">
                        {t('chat.yourNickname')}
                      </Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className="form-control"
                        isInvalid={authFailed}
                      />
                      <Form.Label htmlFor="password">
                        {t('chat.password')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t('chat.wrongNameOrPassword')}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {errors.password && touched.password && errors.password}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="outline-primary"
                      className="w-100 mb-3"
                    >
                      {t('chat.enter')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className=" p-4">
              <div className="text-center">
                <span>
                  {t('chat.haveNotAccount')}
                  {' '}
                </span>
                <Link to="/signup">{t('chat.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
