import {useRef, useEffect} from 'react';
import styled from 'styled-components';

import {callAll} from '../../util/misc';

const Modal = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% / 3);
  height: fit-content;
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

export default ({children, onExit, onKeyDown, ...props}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current.focus();
  }, []);
  return (
    <ModalContainer
      tabIndex="-1"
      ref={modalRef}
      onClick={onExit}
      onKeyDown={callAll(onKeyDown, e => e.key === 'Escape' && onExit())}
      {...props}
    >
      <Modal onClick={e => e.stopPropagation()}>
        {children}
      </Modal>
    </ModalContainer>
  );
};