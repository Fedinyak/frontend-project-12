import React, {
  useEffect, useRef,
  useState,
} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Button, Card, Col, Container, Form, Row,
} from 'react-bootstrap';
import {
  // Link,
  useLocation, useNavigate,
} from 'react-router-dom';
import signupImg from '../../assets/signup.jpg';
import useAuth from '../../hooks/auth';

const schema = Yup.object({
  username: Yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
  password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], ' Пароли должны совпадать').required('Обязательное поле'),
});

const SignUp = () => {
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
                <Card.Img src={signupImg} className="rounded-circle" alt="Войти" />
              </Col>
              <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                  // console.log({username, password}, username?)
                  setAuthFailed(false);
                  try {
                    const response = await axios.post('/api/v1/signup', values);
                    // console.log(response, 'response Login');
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
                    if (error.isAxiosError || error.response.status === 409) {
                      console.log(error.response.status, 'error.response.status');
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
                /* and other goodies */
                }) => (
                  <Form
                    // validated={authFailed}
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className="form-control"
                        ref={inputRef}
                        // isValid={touched.username && errors.username}
                        // isInvalid={touched.username && errors.username}
                        // isInvalid={authFailed}
                        isInvalid={(touched.username && errors.username) || authFailed}
                      />
                      <Form.Label htmlFor="username">
                        Имя пользователя
                      </Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.username}
                      </Form.Control.Feedback>
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
                        // isInvalid={authFailed}
                        isInvalid={(touched.password && errors.password) || authFailed}
                      />
                      <Form.Label htmlFor="password">
                        Пароль
                      </Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        className="form-control"
                        // isValid={touched.password && errors.password}
                        // isInvalid={touched.password && errors.password}
                        isInvalid={(touched.confirmPassword
                          && errors.confirmPassword) || authFailed}
                      />
                      <Form.Label htmlFor="password">
                        Подтвердите пароль
                      </Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.confirmPassword}
                        {authFailed && 'Такой пользователь уже существует'}
                        {/* Пароли должны совпадать */}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group.Feedback type="invalid" tooltip>
                      Такой пользователь уже существует
                    </Form.Group.Feedback> */}
                    {/* {errors.password && errors.password} */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="outline-primary"
                      className="w-100 mb-3"
                    >
                      Зарегистрироваться
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

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
