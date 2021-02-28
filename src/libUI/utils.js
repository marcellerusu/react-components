// Taken from styled-components
// https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/hash.js

export const SEED = 1999;

// When we have separate strings it's useful to run a progressive
// version of djb2 where we pretend that we're still looping over
// the same string
export const phash = (h, x) => {
  let i = x.length;

  while (i) {
    h = (h * 33) ^ x.charCodeAt(--i);
  }

  return h;
};

// This is a djb2 hashing function
export const hash = x => {
  return phash(SEED, x);
};
