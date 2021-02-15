import styled from 'styled-components';

import Fixed from '.';

const Container = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10%;
`;

const Header = styled.header`
  background-color: #00000052;
  height: 60px;
  width: 100%;
  padding: 2%;
  box-sizing: border-box;
`;

const Item = styled.div`
  height: 10%;
  width: 100%;
  background: yellow;
  padding: 2px 0 2px 0;
  border: 1px solid black;
  box-sizing: border-box;
`;

const list = Array.from({length: 50}, () => 'stuff');

export default () => (
  <Container>
    <Fixed>
      <Header>
        Fixed header
      </Header>
    </Fixed>
    {list.map(text => <Item>{text}</Item>)}
  </Container>
);