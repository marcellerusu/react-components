import {useContext, useEffect} from 'react';
import styled from 'styled-components';

import {ScrollContext} from './Scrollable';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default ({id, children}) => {
  const setSection = useContext(ScrollContext);
  useEffect(() => {
    setSection(`#${id}`);
  }, [id])
  return (
    <Page id={id}>
      {children}
    </Page>  
  );
};