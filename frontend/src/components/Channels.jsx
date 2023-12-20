import {
  Col, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../store/channelsSlice.jsx';
import Modal from './modals/Modal.jsx';
import { showModal, setChannelId } from '../store/modalsSlice.jsx';

const UnchangedChannelButton = (name, id, currentChannelId, handleSetChannel) => (
  <Button variant={id === currentChannelId ? 'secondary' : ''} className="w-100 rounded-0 text-start" onClick={() => handleSetChannel(id)}>
    <span className="me-1">#</span>
    {name}
  </Button>
);
/* eslint-disable-next-line */
const ChangedChannelButton = (name, id, currentChannelId, handleSetChannel, dispatch, t) => {
  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button variant={id === currentChannelId ? 'secondary' : ''} className="w-100 rounded-0 text-start text-truncate" onClick={() => handleSetChannel(id)}>
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle split variant={id === currentChannelId ? 'secondary' : ''} id="react-aria5875383625-1" />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => { dispatch(showModal({ modalType: 'remove' })); dispatch(setChannelId({ id })); }}
        >
          {t('channels.delete')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => { dispatch(showModal({ modalType: 'rename' })); dispatch(setChannelId({ id })); }}
        >
          {t('channels.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
const Channels = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const channelsBox = useRef();
  const activeChannel = useRef();

  const dispatch = useDispatch();
  const handleSetChannel = (id) => dispatch(setCurrentChannelId(id));
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Modal />
      </div>
      <ul id="channels-box" ref={channelsBox} className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ name, id, removable }) => (
          <li key={id} className="nav-item w-100 py-1" ref={id === currentChannelId ? activeChannel : null}>
            {!removable && UnchangedChannelButton(name, id, currentChannelId, handleSetChannel)}
            {removable
              && ChangedChannelButton(name, id, currentChannelId, handleSetChannel, dispatch, t)}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
