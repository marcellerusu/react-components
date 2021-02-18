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

const ItemWrapper = ({item, Item}) => {
  const [overlay, setOverlay] = useState(false);
  return (
    <>  
      <ItemContainer onClick={() => setOverlay(true)}>
        <Item item={item} />
      </ItemContainer>
      {overlay &&
        <Overlay onExit={() => setOverlay(false)}>
          <Item item={item} />
        </Overlay>  
      }
    </>
  );
}

const Gallery = ({
  items,
  Item = ({item}) => <DefaultItem src={item}/>,
  keyFunc = item => item,
  numColumns = 3
}) => {
  const cols = group(items, numColumns);
  return (
    <Row>
      {cols.map(groupedItems =>
        <Col key={groupedItems.map(keyFunc).join('')}>
          {groupedItems.map(item => (
            <ItemWrapper
              key={item}
              Item={Item}
              item={item}
            />
          ))}
        </Col>
      )}
    </Row>
  )
};

export default Gallery;