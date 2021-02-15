import {useState} from 'react';
import styled from 'styled-components';

import {useVisible} from '../../util/hooks';

const DefaultLoading = React.forwardRef(({}, ref) => (
  <div ref={ref}>Loading...</div>
));

const DefaultItem = styled.div`
  border: 1px solid black;
`;

const DefaultContainer = styled.div`
  padding: 5px;
`;

const More = ({Loading, onMore}) => {
  const [visible, ref] = useVisible();
  useEffect(() => {
    if (visible) onMore();
  }, [visible]);
  return (
    <Loading ref={ref}>
      Loading...
    </Loading>
  );
};

const LongList = ({list, Container = DefaultContainer, Item = DefaultItem, Loading = DefaultLoading}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      {list.map(item => <Item item={item} />)}
      <More Loading={Loading} onMore={() => setLoading(!loading)} />
    </Container>
  );
};

export default LongList;