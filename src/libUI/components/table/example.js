import styled from '../../styled';
import {Component, dom} from '../..'

import Table from '.';

const Container = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10%;
`;

export default Component(() => {
  // const [value, setValue] = useState('boo')
  return (
    Container()(
      Table({
        data: [{id: 1, name: 'Marcel'}, {id: 2, name: 'Alberto'}],
        columnNames: {id: 'Employee #'}
      })
    )
  )
});