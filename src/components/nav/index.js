import styled from 'styled-components';


const Nav = styled.nav`
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
`;

export const Item = styled.li`
  list-style-type: none;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default Nav;