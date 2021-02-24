import {createContext, useContext, useEffect, useState} from 'react';

import * as fp from '../../util/fp';
import {preventDefault} from '../../util/dom';

const RouterContext = createContext({currentPath: null, setCurrentPath: () => {}});

const ParamsContext = createContext(null);

// TODO: test this
export const useParams = () => {
  return useContext(ParamsContext);
};

// TODO: implement this
// export const useHistory = () => {
//   const {setCurrentPath} = useContext(RouterContext);
//   const push = 
// }

export const Link = ({to, title, children, params = {}, ...props}) => {
  const [paramState] = useState(params);
  const {setCurrentPath} = useContext(RouterContext);
  const go = () => {
    window.history.pushState(params, title, to); // don't need to pass params
    setCurrentPath(to);
  };

  return (
    <ParamsContext.Provider value={paramState}>
      <a {...props} onClick={fp.all(preventDefault, go)} href={to}>
        {children}
      </a>
    </ParamsContext.Provider>
  );
};

export const Route = ({path, children}) => {
  const {currentPath} = useContext(RouterContext);
  if (path === currentPath) {
    return children;
  }
  return null;
};

export const Router = ({children}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    window.onpopstate = () => {
      setCurrentPath(window.location.pathname);
    };
  }, []);
  return (
    <RouterContext.Provider value={{currentPath, setCurrentPath}}>
      {children}
    </RouterContext.Provider>
  );
}