import {useState, useEffect, useRef} from 'react';
import $ from 'jquery';

import {isVisible, throttle} from './scroll';

export const useFreshState = (initState, watchArr) => {
  if (!(watchArr instanceof Array)) throw new Error('Need `watchArr` when using `useFreshState`');
  if (typeof initState === 'function') initState = initState();
  const [state, setState] = useState(initState);
  useEffect(() => {
    setState(initState)
  }, watchArr);
  return [state, setState];
};

const compose = (...fs) => x => fs.reduce((acc, f) => f(acc), x);

export const transform = ([state, ...rest], ...fs) => [compose(...fs)(state), ...rest];

export const useVisible = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    $(window).on('scroll', throttle(() => setVisible(isVisible(ref.current)), 250));
    return () => $(window).off('scroll');
  }, []);

  return [visible, ref];
};