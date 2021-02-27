Array.prototype.reorder = function(from, to) {
  const item = this[from];
  const newArr = this.filter((_, j) => j !== from);
  return [...newArr.slice(0, to), item, ...newArr.slice(to)];
};

Array.prototype.zip = function(other) {
  return this.map((elem, i) => [elem, other[i]]);
};