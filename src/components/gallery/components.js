import styled from 'styled-components';

export const ItemContainer = styled.div`
  width: 100%;
  padding: 3px;
  &:nth-child(even) {
    padding-top: 0;
  }
  box-sizing: border-box;
  &:first-child {
    padding: 0 3px 3px 3px;
  }
  &:last-child {
    padding: 0 3px 0 3px;
  }
  > * {
    transition: 0.1s;
    &:hover {
      transform: scale(1.01);
      box-shadow: 0px 0px 7px #00000063;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DefaultItem = styled.img`
  width: 100%;
`;

export const ArrowImg = styled.img`
  width: 30px;
  margin-${({flip}) => flip ? 'left' : 'right'}: -30px;
  transform: ${({flip}) => `rotate(${flip ? 180 : 0}deg)`};
  cursor: pointer;
  background: #8080809e;
  opacity: 0.2;
  &:hover {
    opacity: 0.6;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
`;
