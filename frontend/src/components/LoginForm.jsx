import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  passwordVerify: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле')
});

export const LoginForm = () => (
  <div>
    <h1>Регистрация</h1>
    <Formik
      initialValues={{
        login: '',
        password: '',
        passwordCheck: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={ (values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="login" />
          {errors.login && touched.login ? (
            <div>{errors.login}</div>
          ) : null}
          <Field name="password" type="password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <Field name="passwordCheck" type="password" />
          {errors.passwordCheck && touched.passwordCheck ? <div>{errors.passwordCheck}</div> : null}
          <button type="submit">Зарегестрироваться</button>
        </Form>
      )}
    </Formik>
  </div>
);