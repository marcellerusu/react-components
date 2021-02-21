import $ from 'jquery';
import {useEffect} from 'react';

const lock = f => {
  let _lock = false;  
  return [(...args) => {
    if (_lock) return;
    _lock = true;
    f(...args, () => _lock = false);
  }, () => _lock];
}

// TODO: don't use $
const [scrollTo, isScrolling] = lock((hash, unlock) => {
  let isTop;
  // if (hash instanceof Array) {
  //   [hash, isTop] = hash;
  // }
  hash = hash.replace('.', '\\.');
  let scrollTop;
  if (isTop) {
    scrollTop = 0;
  } else {
    scrollTop = $(hash).offset().top;
  }
  $(document.scrollingElement)
    .animate({scrollTop}, 200, () => {
      unlock();
      if (!isTop) {
        window.location.hash = hash;
      } else {
        window.location.hash = '';
      }
  });
});

export function isVisible(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

export function throttle(fn, wait) {
  var time = Date.now();
  let timeout;
  const later = () => {
    fn();
    time = Date.now();
    clearTimeout(timeout);
    timeout = undefined;
  };
  return () => {
    const delta = time + wait - Date.now();
    if (delta < 0) {
      later()
    } else if (!timeout) {
      timeout = setTimeout(later, delta);
    }
  }
}

// TODO: this is nasty
const useScroll = (sections, onScroll = () => {}) => {
  let lastHash;
  useEffect(() => {
    $(window).on('scroll', throttle(_ => {
      if (isScrolling()) return;
      const from = lastHash;
      const sectionElements = sections.map(x => [$(x)[0], x]);
      for (const [elem, hash] of sectionElements) {
        if (isVisible(elem) && from !== hash) {
          scrollTo(hash);
          lastHash = hash;
          onScroll(hash);
          break;
        }
      }
    }, 60));
    return () => $(window).off('scroll');
  }, [sections]);
  return sections.map(section => () => scrollTo(section));
};

export default useScroll;