import {useState} from 'react';
import styled from 'styled-components';

import {group} from './utils';

import Overlay from '../overlay';

const ItemContainer = styled.div`
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
    padding: 3px 3px 0 3px;
  }
  > * {
    transition: 0.1s;
    &:hover {
      transform: scale(1.01);
      box-shadow: 0px 0px 7px #00000063;
    }
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DefaultItem = styled.img`
  width: 100%;
`;

const ItemWrapper = ({item: [item, index], Item, activeItem, setActiveItem, maxIndex}) => (
  <>  
    <ItemContainer onClick={() => setActiveItem(index)}>
      <Item item={item} />
    </ItemContainer>
    {activeItem === index &&
      <Overlay
        onExit={() => setActiveItem(-1)}
        onNext={() => setActiveItem(index + 1 > maxIndex ? maxIndex : index + 1)}
        onPrev={() => setActiveItem(index - 1 < 0 ? 0 : index - 1)}
      >
        <Item item={item} />
      </Overlay>  
    }
  </>
);

const Gallery = ({
  items,
  Item = ({item}) => <DefaultItem src={item}/>,
  keyFunc = item => item,
  numColumns = 3
}) => {
  const cols = group(items.map((item, i) => [item, i]), numColumns);
  const [activeItem, setActiveItem] = useState(-1);
  return (
    <Row>
      {cols.map(groupedItems =>
        <Col key={groupedItems.map(keyFunc).join('')}>
          {groupedItems.map(item => (
            <ItemWrapper
              key={item}
              Item={Item}
              item={item}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              maxIndex={items.length - 1}
            />
          ))}
        </Col>
      )}
    </Row>
  )
};

export default Gallery;