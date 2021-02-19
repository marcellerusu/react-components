import React, {useState, useEffect, useRef, useContext} from 'react';

import Arrow from '../../icons/left-arrow.svg';

import {group} from './utils';

import Overlay from '../overlay';
import {ArrowImg, ImageContainer, Row, Col, DefaultItem, ItemContainer} from './components';

const GalleryContext = React.createContext(null);

const LeftArrow = ({...props}) => <ArrowImg {...props} src={Arrow} />;
const RightArrow = ({...props}) => <ArrowImg {...props} src={Arrow} flip />;

const Modal = ({item}) => {
  const {Item, activeItem, setActiveItem, maxIndex} = useContext(GalleryContext);
  const onNext = () => setActiveItem(activeItem + 1 > maxIndex ? maxIndex : activeItem + 1);
  const onPrev = () => setActiveItem(activeItem - 1 < 0 ? 0 : activeItem - 1);
  const handleKeyDown = e => {
    switch (e.key) {
      case 'Escape': return setActiveItem(-1); // TODO: put in <Overlay/>
      case 'ArrowRight': return onNext();
      case 'ArrowLeft': return onPrev();
    }
  };
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Overlay onExit={() => setActiveItem(-1)}>
      <ImageContainer
        tabIndex="-1"
        onKeyDown={handleKeyDown}
        ref={modalRef}
      >
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