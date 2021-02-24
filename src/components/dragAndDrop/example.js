import styled from 'styled-components';

import {WithDND, Draggable, useDraggableState} from '.';

const List = styled.ul`
`;

const Item = Draggable(styled.li`
`);

const initItems = Array.from({length: 10}, (_, i) => i + 1);

const DragAndDropExample = WithDND(() => {
  const [items] = useDraggableState(initItems);
  return (
    <List>
      {items.map(item => (
        <Item key={item} targetId={item}>{item}</Item>
      ))}
    </List>
  );
});

export default DragAndDropExample;