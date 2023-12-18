import { Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../store/channelsSlice.jsx';
import Modal from './modals/Modal.jsx';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const channelList = channels.map(({ id, name, removable }) => {
    const activeСlass = cn({
      'btn-secondary': currentChannelId === id,
    });

    if (!removable) {
      return (
        <li key={id} className="nav-item w-100">
          <button
            onClick={() => dispatch(setCurrentChannelId(id))}
            type="button"
            className={`w-100 rounded-0 text-start btn ${activeСlass}`}
          >
            <span className="me-1">#</span>
            {name}
          </button>
        </li>
      );
    }
    return (
      <li key={id} className="nav-item w-100">
        <div role="group" className="d-flex dropdown btn-group">
          <button
            onClick={() => dispatch(setCurrentChannelId(id))}
            type="button"
            className={`w-100 rounded-0 text-start text-truncate btn ${activeСlass}`}
          >
            <span className="me-1">#</span>
            {name}
          </button>
          <button
            type="button"
            id="react-aria3537157405-2"
            aria-expanded="false"
            className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary"
          >
            <span className="visually-hidden">Управление каналом</span>
          </button>
        </div>
      </li>
    );
  });

  return (
    <Col className="border-end col-3">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Modal />
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelList}
      </ul>
    </Col>
  );
};

export default Channels;
