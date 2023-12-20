import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../store/modalsSlice.jsx';
import { setCurrentChannelId } from '../../store/channelsSlice.jsx';
import { useSocket } from '../../hooks/index.jsx';

const Remove = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        <Modal.Title>{t('channels.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('channels.aUSure')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(hideModal())} type="button" className="me-2" variant="secondary">{t('cancel')}</Button>
          <Button onClick={generateOnSubmit} type="submit" variant="danger">{t('channels.delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
