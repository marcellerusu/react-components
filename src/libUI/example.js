import {Component, mount, dom} from '.';

const App = Component(() => {
  return (
    dom.div({
      onClick: e => console.log(e.target),
      style: 'display: flex; flex-direction: column;'
    })(
      dom.a({href: 'https://google.ca'})('Go to google'),
      dom.a({href: 'https://google.ca'})('Go to google')
    )
  );
});

mount(
  App,
  document.getElementById('root')
);


