import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../store/modalsSlice.jsx';
import { useSocket } from '../../hooks/index.jsx';

const Rename = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels } = useSelector((state) => state.channels);
  const { channelId } = useSelector((state) => state.modals);

  const channelsNames = channels.map(({ name }) => name);
  const renamingChannel = channels.find((channel) => channel.id === channelId);

  const channelNameSchema = yup.object().shape({
    name: yup.string().trim()
      .required(t('required'))
      .notOneOf(channelsNames, t('shouldBeUniq')),
  });

  const formik = useFormik({
    initialValues: { name: renamingChannel.name },
    validationSchema: channelNameSchema,
    onSubmit: async (values) => {
      try {
        const preparedName = values.name.trim();
        formik.values.name = preparedName;

        await channelNameSchema.validate({ name: preparedName });
        await socketApi.renameChan({ id: channelId, name: preparedName });
        dispatch(hideModal());
        formik.resetForm({ values: { name: '' } });
        formik.resetForm();
      } catch (error) {
        formik.setFieldError('name', error.message);
        console.error(error);
      }
    },
    validateOnChange: false,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                id="name"
                className="mb-2"
                isInvalid={(formik.errors.name && formik.touched.name)}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              <Form.Label htmlFor="name" visuallyHidden>{t('channels.name')}</Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button onClick={() => dispatch(hideModal())} type="button" className="me-2" variant="secondary">{t('cancel')}</Button>
              <Button type="submit" variant="primary">{t('send')}</Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
