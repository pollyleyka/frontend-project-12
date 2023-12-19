import { Form, Button, Col } from 'react-bootstrap';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket, useAuth } from '../hooks';

const Messages = () => {
  const socketApi = useSocket();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { messages } = useSelector((state) => state.messages);
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { userName } = JSON.parse(localStorage.getItem('user'));
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : 'general';

  const inputRef = useRef();

  const messagesOfCurrentChannel = messages.filter(
    (message) => message.channelId === currentChannelId,
  );

  const messageBox = useRef(null);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }) => {
      console.log(message);
      try {
        await socketApi.sendMessage({
          message,
          channelId: currentChannelId,
          user: user.username,
        });
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('messages.message', { count: messagesOfCurrentChannel.length })}
          </span>
        </div>

        <div
          id="messages-box"
          ref={messageBox}
          className="chat-messages overflow-auto px-5 h-100"
        >
          {messagesOfCurrentChannel.map(({ id, name, message }) => (
            <div
              key={id}
              className={
                userName === name
                  ? 'user-message text-break mb-2'
                  : 'message text-break mb-2'
              }
            >
              <b>{name}</b>
              {': '}
              {message}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="input-group has-validation">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.message}
                className="border-0 p-0 ps-2"
                placeholder="Введите сообщение..."
                name="message"
                aria-label="Новое сообщение"
                ref={inputRef}
                autoComplete="off"
              />
              <Button type="submit" className="btn-group-vertical border-0" variant="" disabled={formik.values.message === formik.initialValues.message}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
