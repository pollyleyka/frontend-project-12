import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import getModal from './index.js';
import { showModal } from '../../store/modalsSlice.jsx';

const renderModal = (modalType) => {
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return <Component />;
};

const Modal = () => {
  const dispath = useDispatch();

  const modalType = useSelector((state) => state.modal.modalType);
  console.log(modalType);

  return (
    <>
      <Button onClick={() => dispath(showModal({ modalType: 'add' }))} className="p-0 text-primary btn-group-vertical" variant="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="visually-hidden">+</span>
      </Button>
      {renderModal(modalType)}
    </>
  );
};

export default Modal;
