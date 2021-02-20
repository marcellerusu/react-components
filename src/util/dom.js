export const onKey = (key, fn) => e => {
  if (e.key === key) fn();
};

export const stopProp = e => e.stopPropagation();
