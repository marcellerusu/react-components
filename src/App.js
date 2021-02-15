import styled from 'styled-components';

import './App.scss';

import {Scrollable, Page} from './components/scroll';
import Table from './components/table';

const Container = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10%;
`;

function App() {

  return (
    <Scrollable>
      <Page id="home">
        <Container>
          <Table
            data={[{id: 1, name: 'Marcel'}, {id: 2, name: 'Alberto'}]}
            // columnNames={{id: 'Employee #'}}
          />
        </Container>
      </Page>
      <Page id="about">
        About page
      </Page>
    </Scrollable>
  );
}

export default App;
