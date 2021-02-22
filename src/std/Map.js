Map.prototype.map = function(fn) {
  const newMap = new Map();
  for (let [key, value] of this) {
    newMap.set(key, fn([key, value]));
  }
  return newMap;
};