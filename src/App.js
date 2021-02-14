import './App.scss';

import {Scrollable, Page} from './components/scroll';

function App() { 
  return (
    <Scrollable>
      <Page id="home">
        Content in page 1
      </Page>
      <Page id="about">
        About page
      </Page>
    </Scrollable>
  );
}

export default App;
