import axios from 'axios';
import { Navbar, Container, Row, Form, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import loginSchema from '../schemas/index.js';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,

    // onSubmit: async (value) => {
    //   const { username, password } = value;
    //   const userData = { username, password };
    //   try {
    //     const response = await axios.post(routes.loginPath(), userData);
    //     logIn(response.data);
    //     navigate(routes.home);
    //     setAuthError(null);
    //   } catch (error) {
    //     if (!error.isAxiosError) {
    //       setAuthError(t('loginPage.validation.unknown'));
    //     }
    //     const { statusText } = error.response;
    //     const message = statusText === 'Unauthorized'
   // //       ? t('loginPage.validation.wrongData')
    //       : t('loginPage.validation.unknown');
    //     setAuthError(message);
    //   }
    // },


    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
        <div className="container-fluid h-100">
          <Row className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <Row className="card-body p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img
                      src="../assets/avatar.jpg"
                      className="rounded-circle"
                      alt="Войти"
                    ></img>
                  </div>
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">{t('form.enter')}</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        placeholder={t('form.loginPlaceholder')}
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        ref={inputRef}
                        className={
                          errors.username && touched.username
                            ? 'is-invalid'
                            : ''
                        }
                      />
                      <Form.Label htmlFor="username">
                        {t('form.loginPlaceholder')}
                      </Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        name="password"
                        autoComplete="current-password"
                        placeholder={t('form.passwordPlaceholder')}
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password
                            ? 'is-invalid'
                            : ''
                        }
                        required
                      />
                      <Form.Label htmlFor="password">
                        {t('form.passwordPlaceholder')}
                      </Form.Label>
                      {/* {(errors.password && touched.password) ||
                      (errors.username && touched.username) ? (
                        <div className="invalid-tooltip">
                          {t('validation.wrongData')}
                        </div>
                      ) : null} */}
                      <Form.Control.Feedback type="invalid">{t('validation.wrongData')}</Form.Control.Feedback>
                    </Form.Floating>
                    <Button
                      type="submit"
                      className="w-100 mb-10"
                      disabled={isSubmitting}
                      variant="primary"
                    >
                      {t('form.enter')}
                    </Button>
                  </Form>
                </Row>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта? </span>
                    <a href="/signup">Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
