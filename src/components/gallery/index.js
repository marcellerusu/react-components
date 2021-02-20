import React, {useState, useContext} from 'react';

import Arrow from '../../icons/left-arrow.svg';

import {group} from './utils';
import {onKey} from '../../util/dom';
import * as fp from '../../util/fp';

import Overlay from '../overlay';
import {ArrowImg, ImageContainer, Row, Col, DefaultItem, ItemContainer} from './components';

const GalleryContext = React.createContext(null);

const LeftArrow = ({...props}) => <ArrowImg {...props} src={Arrow} />;
const RightArrow = ({...props}) => <ArrowImg {...props} src={Arrow} flip />;

const Modal = ({item}) => {
  const {Item, activeItem, setActiveItem, maxIndex} = useContext(GalleryContext);
  const onNext = () => setActiveItem(activeItem + 1 > maxIndex ? maxIndex : activeItem + 1);
  const onPrev = () => setActiveItem(activeItem - 1 < 0 ? 0 : activeItem - 1);
  const handleKeyDown = fp.all(
    onKey('ArrowLeft', onPrev),
    onKey('ArrowRight', onNext)
  );

  return (
    <Overlay onExit={() => setActiveItem(-1)} onKeyDown={handleKeyDown}>
      <ImageContainer>
        {activeItem > 0 && <LeftArrow onClick={onPrev} />}
        <Item item={item} />
        {activeItem < maxIndex && <RightArrow onClick={onNext} />}
      </ImageContainer>
    </Overlay>
  );
};

const ItemWrapper = ({item: [item, index]}) => {
  const {Item, activeItem, setActiveItem} = useContext(GalleryContext);
  return (
    <>  
      <ItemContainer onClick={() => setActiveItem(index)}>
        <Item item={item} />
      </ItemContainer>
      {activeItem === index && <Modal item={item}/>}
    </>
  );
};

const Gallery = ({
  items,
  Item = ({item}) => <DefaultItem src={item}/>,
  keyFunc = item => item,
  numColumns = 3
}) => {
  const cols = group(items.map((item, i) => [item, i]), numColumns);
  const [activeItem, setActiveItem] = useState(-1);
  const maxIndex = items.length - 1;
  return (
    <GalleryContext.Provider value={{activeItem, setActiveItem, Item, maxIndex}}>
      <Row>
        {cols.map(groupedItems =>
          <Col key={groupedItems.map(keyFunc).join('')}>
            {groupedItems.map(item => <ItemWrapper key={item} item={item} />)}
          </Col>
        )}
      </Row>
    </GalleryContext.Provider>
  )
};

export default Gallery;