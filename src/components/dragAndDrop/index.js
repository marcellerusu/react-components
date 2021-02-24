import {useState, createContext, useContext, useEffect} from 'react';

import {stopProp, preventDefault} from '../../util/dom'
import * as fp from '../../util/fp';

const DNDContext = createContext({
  dragging: null, setDragging: () => {},
  dragOver: null, setDragOver: () => {},
  items: [], setItems: () => {}
});

const DraggableItem = ({children, targetId, Component}) => {
  const {
    dragging, setDragging,
    dragOver, setDragOver,
    items, setItems
  } = useContext(DNDContext);

  const onDrag = () => {
    if (targetId === dragging) return;
    setDragging(targetId);
  };

  const onDrop = () => {
    const draggingIndex = items.findIndex(item => item === dragging);
    const dragOverIndex = items.findIndex(item => item === dragOver);
    setItems(items.reorder(draggingIndex, dragOverIndex));
    setDragging(null);
    setDragOver(null);
  };

  const onDragOver = () => {
    if (dragOver === targetId) return;
    setDragOver(targetId);
  };

  const ignoreEvents = f => fp.all(stopProp, preventDefault, f);

  return (
    <Component
      draggable
      onDrag={ignoreEvents(onDrag)}
      onDrop={ignoreEvents(onDrop)}
      onDragOver={ignoreEvents(onDragOver)}
    >
      {children}
    </Component>
  )
};

export const Draggable = Component => props => (
  <DraggableItem {...props} Component={Component} />
);

export const useDraggableState = (initItems) => {
  const {items, setItems} = useContext(DNDContext);
  useEffect(() => {
    setItems(initItems);
  }, []);
  return [items, setItems];
}

const DNDContainer = ({children}) => {
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [items, setItems] = useState([]);
  
  return (
    <DNDContext.Provider
      value={{
        dragging, setDragging,
        dragOver, setDragOver,
        items, setItems
      }}
    >
      {children}
    </DNDContext.Provider>
  )
};

export const WithDND = Component => props => (
  <DNDContainer>
    <Component {...props}/>
  </DNDContainer>
);