import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {throttle} from '../../util/scroll';

const Nav = styled.nav`
  position: fixed;
  width: 100vw;
  transition: 0.3s;
  background: ${({top}) => top ? '#00000000' : '#00000029'};
`;

const ShadowNav = styled.div`
  width: 100vw;
  /* 2 * 0.5rem margin from <Item>,
    2 * 1rem margin from <ul> + 1rem for the line of text
    & 2 * 1px margin on actual <a> */
  height: calc(4rem + 2px);
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
`;

export const Item = styled.li`
  list-style-type: none;
  margin: 0.5rem;
`;

export default ({children}) => {
  const [isTop, setTop] = useState(window.pageYOffset === 0);
  useEffect(() => {
    document.onscroll = throttle(() => setTop(window.pageYOffset === 0), 250);
  }, []);
  return (
    <>  
      <Nav top={isTop}>
        <List>
          {children}
        </List>
      </Nav>
      <ShadowNav />
    </>
  );
};