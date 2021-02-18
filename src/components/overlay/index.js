import {useEffect, useRef} from 'react';

import styled from 'styled-components';

const Modal = styled.div`
  width: calc(100% / 3);
  height: fit-content;
  &:focus {
    outline: none;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #80808091;
`;

export default ({children, onExit, onNext, onPrev}) => {
  const handleKeyDown = e => {
    switch (e.key) {
      case 'Escape': return onExit();
      // TODO: add actual arrows
      case 'ArrowLeft': return onPrev();
      case 'ArrowRight': return onNext();
    }
  };
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current.focus();
  }, []);
  return (
    <ModalContainer onClick={onExit}>
      <Modal
        tabIndex="-1"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        ref={modalRef}
      >
        {children}
      </Modal>
    </ModalContainer>
  );
};