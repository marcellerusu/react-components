let state, idCounter = 0;
export const Component = component => {
  return componentProps => (...children) => ({
    _id: idCounter++,
    componentProps: {children, ...componentProps},
    component,
    state: [], // done at run time
    type: 'custom',
    children: []
  });
};

export const mount = (component, root) => {
  state = component(); // TODO: I shouldn't need to call this
  constructTree(state); // ideally not mutations
  root.appendChild(render(state));
};

const constructTree = element => {
  switch (element.type) {
    case 'primitive':
      return element;
    case 'custom':
      const {component, componentProps} = element;
      if (component(componentProps) instanceof Array) {
        throw `Custom components are not allowed to have multiple children`;
      }
      element.children = [component(componentProps)];
      return constructTree(element.children[0])
    default:
      throw 'no type';
  }
};

const getComponentById = (id, elem = state) => {
  if (!elem) return undefined;
  // if (elem.type === 'primitive') return 
  if (elem._id === id) return elem;
  return elem.children.find(el => getComponentById(id, el))
}

// TODO: implement
let currentRenderId;
let stateCounter = 0;
export const useState = initialValue => {
  const {state} = getComponentById(currentRenderId);
  if (!state.length) {
    if (stateCounter !== 0) throw 'WTF';
    state[stateCounter] = initialValue;
  }

  const setState = newValue => {
    state[stateCounter] = newValue;
  };
  stateCounter++
  return [state[stateCounter - 1], setState];
}

const render = element => {
  switch (element.type) {
    // base case
    case undefined:
      return document.createTextNode(element);
    // dom.`type`
    case 'primitive':
      return renderDomNode(element);
    // lib-ui component
    case 'custom':
      currentRenderId = element._id;
      // probably needs to track state here
      return render(element.children[0])
  }
};

export const dom = new Proxy({}, {
  get(_, domType) {
    return domProps => (...children) =>
      ({type: 'primitive', domType, domProps, children});
  }
});

const renderDomNode = ({domType, domProps, children}) => {
  const elem = document.createElement(domType);
  for (const key in domProps) {
    if (key === 'className') {
      elem.classList.add(domProps[key]);
    } else {
      elem[key.toLowerCase()] = domProps[key];
    }
  }
  for (const child of children) {
    elem.appendChild(render(child));
  }
  return elem;
};

const Header = Component(({id, children}) => (
  dom.header({id})(...children)
));

const App = Component(() => (
  Header({id: 'header'})(
    dom.div()('HELLO'),
    dom.h1()('world')
  )
));

mount(
  App(),
  document.getElementById('root')
);

console.log('here', state, getComponentById(2));