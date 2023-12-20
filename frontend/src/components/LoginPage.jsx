import axios from 'axios';
import {
  Navbar, Container, Row, Form, Button,
} from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import schemas from '../schemas/index.js';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import imagePath from '../assets/avatar.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

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
    validationSchema: schemas.login,

    onSubmit: async (value) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), value);
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: routes.home } };
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
                    src={imagePath}
                    className="img-fluid"
                    alt={t('loginPage.login')}
                  />
                </div>
                <Form
                  onSubmit={handleSubmit}
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                >
                  <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
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
                      {t('loginPage.password')}
                    </Form.Label>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="password"
                      autoComplete="current-password"
                      placeholder={t('loginPage.password')}
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
                      {t('loginPage.password')}
                    </Form.Label>
                    <Form.Control.Feedback type="invalid">{t('validation.wrongData')}</Form.Control.Feedback>
                  </Form.Floating>
                  <Button
                    type="submit"
                    className="w-100 mb-10"
                    disabled={isSubmitting}
                    variant="primary"
                  >
                    {t('loginPage.login')}
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
  );
};
export default LoginPage;
