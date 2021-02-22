import styled from 'styled-components';

export const Header = styled.header`
`;

export const Item = styled.div`
  margin-top: 0.5em;
`;

const ItemsList = styled.ul`
  font-size: 13px;
  padding-left: 0.5em;
  margin-top: 0;
`;

export const Section = ({title, children}) => (
  <div>
    <h5>{title}</h5>
    <ItemsList>
      {children}
    </ItemsList>
  </div>
);

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideNav = styled.div`
  width: calc(100vw / 6);
  height: 100vh;
  background: #afafaf;
  padding: 1rem;
  box-sizing: border-box;
`;

export default SideNav;