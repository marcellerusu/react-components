import {withState, dom} from '../../index';
import styled from '../../styled';

import {sortFunction, fillEmptyColumnNames} from './utils';

const Rotatable = styled.span`
  display: inline-block;
  transform: rotate(${({flipped}) => flipped ? 180 : 0}deg);
  ${({show}) => !show && 'opacity: 0;'}
`;

// TODO: styles - we will take render props, but have defaults
export default withState(({data = [], columnNames, useState}) => {
  const cols = Object.keys(data[0] || {});
  const [sort, setSort] = useState({col: cols[0], factor: 1});
  if (!columnNames) {
    columnNames = Object.fromEntries(cols.map(c => [c, c])); // ['a', 'b'] -> {a: 'a', b: 'b'}
  } else {
    columnNames = fillEmptyColumnNames(columnNames, cols);
  }
  data = data.sort(sortFunction(sort));

  return (
    dom.table()(
      dom.thead()(
        dom.tr()(
          ...Object.keys(columnNames).map(col => (
            dom.th({
              onClick: () => setSort({col, factor: sort.col === col ? (sort.factor * -1) : 1 }),
              key: `${col}-header`
            })(
              columnNames[col],
              Rotatable({show: sort.col === col, flipped: sort.factor === -1})('^')
            )
          ))
        )
      ),
      dom.tbody()(
        ...data.map((row, i) => (
          // Use a better value for key
          dom.tr({key: sort.col + i})(
            ...Object.keys(row).map((k, j) =>
              dom.td({key: `${k}-${j}`})(row[k])))
          )
        )
      )
    )
  );
});