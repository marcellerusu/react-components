import {Link, Router, Route} from '.';

const RouterExample = () => (
  <Router>
    <Route path="/" title="Home">
      Page 1
      <Link to="/about">About</Link>
    </Route>
    <Route path="/about" title="About">
      Page 2
      <Link to="/">Home</Link>
    </Route>
  </Router>
);

export default RouterExample;