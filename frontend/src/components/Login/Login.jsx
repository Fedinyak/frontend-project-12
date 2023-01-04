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
// import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth';

const schema = Yup.object({
  // username: Yup.string().min(2, 'Must be 3 characters or more').required('Required'),
  // password: Yup.string().min(3).required('Required'),
});

// const getAuthHeader = () => {
//   const userId = JSON.parse(localStorage.getItem('token'));
//   if (userId && userId.token) {
//     return { Authorization: `Bearer ${userId.token}` };
//   }

//   return {};
// };

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

  // const navigate = useNavigate();
  // const { auth, setAuth } = useContext(AuthContext);

  return (
    <Container fluid className="h-100">
      {/* <section className="container-fluid h-100"> */}
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
              {/* <p>{`${auth}`}</p> */}
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                  setAuthFailed(false);
                  try {
                    const response = await axios.post('/api/v1/login', values);
                    console.log(response, 'response Login');
                    // localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', JSON.stringify(response.data));
                    auth.logIn();
                    const { from } = location.state || { from: { pathname: '/' } };
                    navigate(from);
                    // setAuth(true);
                    // navigate('/');
                    // const testAuth = getAuthHeader();
                    // console.log(testAuth, 'testAuth');
                  } catch (error) {
                    console.error(error);
                    setSubmitting(false);
                    // formik.setSubmitting(false);
                    if (error.isAxiosError && error.response.status === 401) {
                      setAuthFailed(true);
                      inputRef.current.select();
                      return;
                    }
                    throw error;
                  }
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   setSubmitting(false);
                  // }, 400);
                // axios.post('/api/v1/login', { username: 'admin',
                // password: 'admin' }).then((response) => {
                // axios.post('/api/v1/login', values).then((response) => {
                //   console.log(response.data); // => { token: ..., username: 'admin' }
                // });
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2));
                //   setSubmitting(false);
                // }, 400);
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
                /* and other goodies */
                }) => (
                  <Form
                    // noValidate
                    // hasValidation
                    // validated={authFailed}
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">{t('chat.enter')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className="form-control"
                        ref={inputRef}
                        // isValid={touched.username && errors.username}
                        // isInvalid={touched.username && errors.username}
                        isInvalid={authFailed}
                      />
                      <Form.Label htmlFor="username">
                        {t('chat.yourNickname')}
                      </Form.Label>
                    </Form.Group>
                    {/* {errors.username && touched.username && errors.username} */}
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className="form-control"
                        // isValid={touched.password && errors.password}
                        // isInvalid={touched.password && errors.password}
                        isInvalid={authFailed}
                      />
                      <Form.Label htmlFor="password">
                        {t('chat.password')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {/* {errors.password} */}
                        {t('chat.wrongNameOrPassword')}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group.Feedback type="invalid" tooltip>
                      Неверные имя пользователя или пароль
                    </Form.Group.Feedback> */}
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
      {/* <Button type="submit" onClick={() => console.log(getAuthHeader())}>get</Button> */}
      {/* <Button type="submit"
       onClick={() => console.log(JSON.parse(localStorage.getItem('token')))}>get</Button> */}
      {/* </section> */}
    </Container>
  );
};

export default Login;

//  <Formik
//       initialValues={{ name: "", password: "" }}
//       validate={values => {
//         const errors = {};
//         if (!values.name) {
//           errors.name = "Required";
//         } else if (
//           console.log("error")
//           // !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.name = "Invalid email address";
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//         /* and other goodies */
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="name"
//             name="name"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.name}
//           />
//           {errors.name && touched.name && errors.name}
//           <input
//             type="password"
//             name="password"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.password}
//           />
//           {errors.password && touched.password && errors.password}
//           <button type="submit" disabled={isSubmitting}>
//             Войти
//           </button>
//         </form>
//       )}
//     </Formik>
