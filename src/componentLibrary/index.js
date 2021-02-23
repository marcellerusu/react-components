import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import SideNav, {Header, Section, Item, Container}  from '../components/sideNav';

import FormExample from '../components/forms/example';
import GalleryExample from '../components/gallery/example';
// import LongListExample from '../components/forms/example';
import NavExample from '../components/nav/example';
// import OverlayExample from '../components/forms/example';
import ScrollExample from '../components/scroll/example';
import StickyExample from '../components/sticky/example';
import TableExample from '../components/table/example';
import DragAndDropExample from '../components/dragAndDrop/example';

const ComponentExamples = new Map([
  ['Form', FormExample],
  ['Gallery', GalleryExample],
  // ['LongListExample', LongListExample],
  ['Nav', NavExample],
  // ['OverlayExample', OverlayExample],
  ['Scroll', ScrollExample],
  ['Sticky', StickyExample],
  ['Table', TableExample],
  ['DragAndDrop', DragAndDropExample]
]);

export default () => (
  <Router>
    <Container>
      <SideNav>
        <Header>
          Welcome to React-CMS
        </Header>
        {[...ComponentExamples.map(([key]) => (
          <Section key={`link-to-${key}`} title={key}>
            <Item>
              <Link to={`/${key}`}>{key}</Link>
            </Item>
          </Section>
        )).values()]}
      </SideNav>
      <div style={{width: '100%', height: '100vh', overflow: 'scroll'}}>
        <Switch>
          {[...ComponentExamples.map(([key, Component]) => (
            <Route key={`view-${key}`} path={`/${key}`}>
              <Component />
            </Route>
          )).values()]}
        </Switch>
      </div>
    </Container>
  </Router>
);