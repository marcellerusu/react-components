import {withState, mount, dom, styled} from '.';
import * as fp from '../util/fp';
import {stopProp} from '../util/dom';

const Container = styled.div`
  display: flex;
  background: ${props => props.direction};
  width: 100px;
  height: 100px;
`;

const sortFn = (a, b) => {
  if (typeof a === 'string') {
    return a.localeCompare(b);
  } else {
    return a - b;
  }
}

const Table = withState(({items = [], state: sort = {asc: 1}, setState: setSort}) => (
  dom.table()(
    dom.thead()(
      dom.tr()(
        dom.th({
          onClick: fp.all(
            stopProp,
            () => setSort({prop: 'name', asc: sort.asc * -1})
          )
        })(
          'Name'
        ),
        dom.th({
          onClick: fp.all(
            stopProp,
            () => setSort({prop: 'id', asc: sort.asc * -1})
          )
        })(
          'Id'
        )
      )
    ),
    dom.tbody()(
      ...items.sort((a, b) => sortFn(a[sort.prop], b[sort.prop]) * sort.asc).map(({name, id}) => (
        dom.tr()(
          dom.td()(name),
          dom.td()(id),
        )
      ))
    )
  )
));

const App = withState(({state: direction = 'green', setState: setDirection}) => {
  return (
    Container({
      direction,
      style: 'width: 200px;',
      onClick: e => setDirection(direction === 'green' ? 'red' : 'green')
    })(
      Table({items: [{name: 'John', id: 1}, {name: 'Marcelle', id: 0}]})
    )
  );
});

mount(
  App,
  document.getElementById('root')
);
