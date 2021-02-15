import {useState, useMemo} from 'react';
import styled from 'styled-components';

import {sortFunction, fillEmptyColumnNames} from './utils';

const Rotatable = styled.span`
  display: inline-block;
  transform: rotate(${({flipped}) => flipped ? 180 : 0}deg);
  ${({show}) => !show && 'opacity: 0;'}
`;

// TODO: styles - we will take render props, but have defaults
export default ({data = [], columnNames}) => {
  const cols = Object.keys(data[0] || {});
  columnNames = useMemo(() => {
    if (!columnNames) {
      return Object.fromEntries(cols.map(c => [c, c])); // ['a', 'b'] -> {a: 'a', b: 'b'}
    } else {
      return fillEmptyColumnNames(columnNames, cols);
    }
  }, [columnNames, data]);

  const [sort, setSort] = useState({col: cols[0], factor: 1});
  data = useMemo(() => data.sort(sortFunction(sort)), [data, sort]);

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(columnNames).map(col => (
            <th
              onClick={() => setSort({col, factor: sort.col === col ? (sort.factor * -1) : 1 })}
              key={`${col}-header`}
            >
              {columnNames[col]}
              <Rotatable show={sort.col === col} flipped={sort.factor === -1}>^</Rotatable>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          // Use a better value for key
          <tr key={sort.col + i}>
            {Object.keys(row).map((k, j) => <td key={`${k}-${j}`}>{row[k]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};