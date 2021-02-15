export const sortFunction = ({col, factor}) => (a, b) => {
  if (typeof a[col] === 'string') {
    return a[col].localeCompare(b[col]) * factor; 
  } else {
    return (a[col] - b[col]) * factor;
  }
};


export const fillEmptyColumnNames = (columnNames, cols) => {
  if (new Set([...Object.keys(columnNames), ...cols]).size !== Object.keys(columnNames).length) {
    for (const key of cols) {
      if (typeof columnNames[key] === 'undefined') {
        columnNames[key] = key;
      }
    }
   }
}
