import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string().min(4, 'Логин должен быть не менее 4-х символов')
    .required('Обязательное поле'),
  password: yup.string().min(4, 'Пароль должен быть не менее 4-х символов')
    .required('Обязательное поле'),
});
