import {Component, mount, dom} from '.';

const App = Component(() => {
  return (
    dom.div({onClick: e => console.log(e.target)})(
      dom.a({href: 'https://google.ca'})`Go to google`
    )
  );
});

mount(
  App,
  document.getElementById('root')
);


