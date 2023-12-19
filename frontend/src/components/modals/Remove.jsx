import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { hideModal } from '../../store/modalsSlice.jsx';
import { setCurrentChannelId } from '../../store/channelsSlice.jsx';
import { useSocket } from '../../hooks/index.jsx';

const Remove = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();

  const { channelId } = useSelector((state) => state.modals);
  const { currentChannelId } = useSelector((state) => state.channels);

  const generateOnSubmit = async () => {
    try {
      await socketApi.removeChan({ id: channelId });
      dispatch(hideModal());
      /* eslint-disable-next-line */
      if (currentChannelId === channelId) {
        dispatch(setCurrentChannelId(1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(hideModal())} type="button" className="me-2" variant="secondary">Отменить</Button>
          <Button onClick={generateOnSubmit} type="submit" variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
