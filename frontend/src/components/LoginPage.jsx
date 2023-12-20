import axios from 'axios';
import { Row, Form, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import imagePath from '../assets/avatar.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const loginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (value) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), value);
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: routes.home } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        /* eslint-disable-next-line */
        if (err.message === 'Network Error') {
          toast.error(t('toast.connectionError'));
          console.error('error', err);
        }
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
      <Header />
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
                  onSubmit={formik.handleSubmit}
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                >
                  <fieldset disabled={formik.isSubmitting}>
                    <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        placeholder={t('loginPage.nickname')}
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required
                        ref={inputRef}
                        isInvalid={authFailed}
                      />
                      <Form.Label htmlFor="username">
                        {t('loginPage.nickname')}
                      </Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        name="password"
                        autoComplete="current-password"
                        placeholder={t('loginPage.password')}
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor="password">
                        {t('loginPage.password')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {t('loginPage.unsuccessLogin')}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Button
                      type="submit"
                      className="w-100 mb-3"
                      disabled={formik.isSubmitting}
                      variant="outline-primary"
                    >
                      {t('loginPage.login')}
                    </Button>
                  </fieldset>
                </Form>
              </Row>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('loginPage.noAcc')}</span>
                  {' '}
                  <a href="/signup">{t('loginPage.registration')}</a>
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
