import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { setCurrentChannelId } from '../../store/channelsSlice.jsx';
import { hideModal } from '../../store/modalsSlice.jsx';
import { useSocket } from '../../hooks/index.jsx';

const channelNameValidation = (names) => yup.object().shape({
  name: yup.string().trim()
    .required('Обязательное поле')
    .notOneOf(names, 'Должно быть уникальным'),
});

const Add = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels);

  const channelsNames = channels.map(({ name }) => name);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelNameValidation(channelsNames),
    onSubmit: async (values) => {
      try {
        const response = await socketApi.newChannel({ name: values.name });
        dispatch(setCurrentChannelId(response.data.id));
        dispatch(hideModal());
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },

  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              placeholder="Имя канала"
              id="name"
              className="mb-2"
              isInvalid={(formik.errors.name && formik.touched.name)}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <Form.Label htmlFor="name" hidden>Имя канала</Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button onClick={() => dispatch(hideModal())} type="button" className="me-2" variant="secondary">Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;