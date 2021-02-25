import {withState, mount, dom} from '.';

const Container = props => dom.div({
  ...props,
  style: `
    display: flex;
    flex-direction: ${props.direction};
    width: 100px;
    height: 100px;
    background: gray;
  `
});

const InactiveLink = ({to, text}) => (
  dom.a({href: to, onClick: e => e.preventDefault()})(text)
);

const App = withState(({state: direction = 'row', setState}) => {
  return (
    Container({
      direction,
      onClick: e => setState(direction === 'row' ? 'column' : 'row')
    })(
      InactiveLink({to: 'https://google.ca', text: 'hmm'}),
      InactiveLink({to: 'https://google.ca', text: 'hmm2'})
    )
  );
});

mount(
  App,
  document.getElementById('root')
);
