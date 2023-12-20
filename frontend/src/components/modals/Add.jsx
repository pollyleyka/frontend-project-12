import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../../store/channelsSlice.jsx';
import { hideModal } from '../../store/modalsSlice.jsx';
import { useSocket } from '../../hooks/index.jsx';

const ruProfanity = filter.getDictionary('ru');
filter.add(ruProfanity);

export const channelNameValidation = (names, t) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(t('required'))
    .notOneOf(names, t('shouldBeUniq'))
    .transform((value) => filter.clean(value)),
});

const Add = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.channels);

  const channelsNames = channels.map(({ name }) => name);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelNameValidation(channelsNames, t),
    onSubmit: async (values) => {
      try {
        const preparedName = filter.clean(values.name.trim());
        const response = await socketApi.newChannel({ name: preparedName });
        dispatch(setCurrentChannelId(response.data.id));
        dispatch(hideModal());
        toast.success(t('toast.channelCreate'));
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('channels.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.errors.name ? filter.clean(formik.values.name) : formik.values.name}
              name="name"
              placeholder={t('channels.name')}
              id="name"
              className="mb-2"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Form.Label htmlFor="name" hidden>
              {t('channels.name')}
            </Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => dispatch(hideModal())}
              type="button"
              className="me-2"
              variant="secondary"
            >
              {t('cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('send')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
