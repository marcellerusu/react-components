import React, {useState} from 'react';

import useScroll from '../../util/scroll';

export const ScrollContext = React.createContext(null);

// TODO: check 100vh issue & store scroll functions in `ScrollContext`
export default ({children}) => {
  // assuming sections is in order - TODO: actually go in the dom & sort the sections
  const [sections, setSections] = useState([]);
  useScroll(sections);
  const setSection = newSection => setSections(sections => sections.concat(newSection));

  return (
    <ScrollContext.Provider value={setSection}>
      {children}
    </ScrollContext.Provider>
  );
};