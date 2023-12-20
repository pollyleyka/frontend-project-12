import axios from 'axios';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import imagePath from '../assets/avatar_1.jpg';

const SignUpPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signUpSchema = yup.object({
    username: yup
      .string()
      .trim()
      .required(t('required'))
      .min(3, t('signUpPage.usernameCountOfSymbols'))
      .max(20, t('signUpPage.usernameCountOfSymbols')),
    password: yup
      .string()
      .required(t('required'))
      .min(6, t('signUpPage.passwordCountOfSymbols')),
    confirmPassword: yup
      .string()
      .required(t())
      .min(6, t('signUpPage.passwordCountOfSymbols'))
      .oneOf([yup.ref('password')], t('signUpPage.passwordMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async ({ username, password, confirmPassword }) => {
      try {
        const res = await axios.post(
          routes.signupPath(),
          { username: username.toLowerCase(), password, confirmPassword },
        );
        auth.logIn(res.data);
        navigate(routes.home);
      } catch (err) {
        formik.setSubmitting(false);
        console.error('error', err);
        if (err.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        if (err.isAxiosError) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <div className="container-fluid h-100">
      <Header />
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={imagePath} className="rounded-circle" alt={t('signUpPage.registration')} />
              </Col>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUpPage.registration')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3 form-floating">
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      placeholder={t('signUpPage.usernameCountOfSymbols')}
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={(formik.errors.username && formik.touched.username) || authFailed}
                      required
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">{t('signUpPage.username')}</Form.Label>
                    {!authFailed && <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>}
                    {authFailed && <Form.Control.Feedback type="invalid">{t('signUpPage.userExist')}</Form.Control.Feedback>}
                  </Form.Group>
                  <Form.Group className="mb-3 form-floating">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder={t('signUpPage.passwordCountOfSymbols')}
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      aria-describedby="passwordHelpBlock"
                      isInvalid={(formik.errors.password && formik.touched.password)}
                      required
                    />
                    <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4 form-floating">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      placeholder={t('signUpPage.passwordMatch')}
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
                      isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword)}
                      required
                    />
                    <Form.Label htmlFor="confirmPassword">{t('signUpPage.confirmPassword')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('signUpPage.register')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;
