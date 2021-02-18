import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #80808091;
`;

const Modal = styled.div`
  position: absolute;
  left: calc(100% / 3);
  top: 20%;
  width: calc(100% / 3);
  // border: 3px solid #969696;
  // border-radius: 2px;
`;

export default ({children, onExit}) => {
  return (
    <>
      <Background onClick={onExit} />
      <Modal>
        {children}
      </Modal>
    </>
  )
};