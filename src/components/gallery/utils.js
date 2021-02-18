export const group = (arr, by) => {
  const groups = [];
  arr.forEach((item, i) => {
    groups[i % by] = groups[i % by] || [];
    groups[i % by].push(item);
  });
  return groups;
};
