import {useState} from 'react';
import styled from 'styled-components';

const List = styled.ul`
`;

const Item = styled.li`
`;

const initItems = Array.from({length: 10}, (_, i) => i + 1);

const reorder = (arr, from, to) => {
  const [item] = arr.splice(from, 1);
  return [...arr.slice(0, to), item, ...arr.slice(to)];
};

// TODO: clean up!
const DragAndDropExample = () => {
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [items, setItems] = useState(initItems);
  const onDrag = item => e => {
    if (item === dragging) return;
    setDragging(item);
    e.dataTransfer.dropEffect = 'move';
  };
  
  const onDrop = e => {
    e.stopPropagation();
    e.preventDefault();
    setItems(reorder(items, dragging, dragOver));
    setDragging(null);
    setDragOver(null);
  };

  return (
    <List>
      {items.map((item, i) => (
        <Item
          key={item}
          onDrag={onDrag(i)}
          onDragOver={e => {
            e.stopPropagation();
            e.preventDefault();  
            if (dragOver !== i) setDragOver(i);
          }}
          onDrop={onDrop}
          draggable
        >
          {item}
        </Item>
      ))}
    </List>
  );
};

export default DragAndDropExample;