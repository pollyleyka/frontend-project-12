import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import loginSchema from '../schemas/index.js'


const LoginForm = () => {
  const { t } = useTranslation();
  const { values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });
  console.log(touched);
  return (
    <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
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
          className={errors.username && touched.username ? 'is-invalid' : '' }
        />
        <Form.Label htmlFor="username">{t('form.loginPlaceholder')}</Form.Label>
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
          className={(errors.password && touched.password) ? 'is-invalid' : '' }
        />
        <Form.Label htmlFor="password">
          {t('form.passwordPlaceholder')}
        </Form.Label>
        {(errors.password && touched.password) ||
            (errors.username && touched.username) ? (
              <div className="invalid-tooltip">{t('validation.wrongData')}</div>
            ) : null}
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
  );
};

export default LoginForm;
