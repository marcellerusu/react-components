import {useRef, useEffect} from 'react';
import styled from 'styled-components';

import {stopProp, onKey} from '../../util/dom';
import * as fp from '../../util/fp';

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
  &:focus {
    outline: none;
  }
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
      onKeyDown={fp.all(onKeyDown, onKey('Escape', onExit))}
      {...props}
    >
      <Modal onClick={stopProp}>
        {children}
      </Modal>
    </ModalContainer>
  );
};