import styled from 'styled-components';

const Modal = styled.div`
  width: calc(100% / 3);
  height: fit-content;
`;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #80808091;
`;

export default ({children, onExit}) => {
  return (
    <ModalContainer onClick={onExit}>
      <Modal>
        {children}
      </Modal>
    </ModalContainer>
  );
};