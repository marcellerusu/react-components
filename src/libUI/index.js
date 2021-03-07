let globalState, idCounter = 0;
export const Component = component => {
  // TODO: consider doing something different w how children are passed in
  return componentProps => (...children) => ({
    _id: idCounter++,
    componentProps: {children, ...componentProps},
    component,
    mount: null,
    state: [], // done at run time
    type: 'custom',
    children: []
  });
};
let constructingTree = false, rootElem;
export const mount = (component, root) => {
  rootElem = root;
  globalState = component;
  component.mount = root;
  constructingTree = true;
  constructTree(globalState); // TODO: ideally not mutations
  constructingTree = false;
  root.appendChild(render(globalState));
};

const constructTree = (element, parent = element) => {
  if (!element) element = {type: undefined};
  console.log(element);
  switch (element.type) {
    case undefined:
      return;
    case 'primitive':
      return element.children.map(elem => constructTree(elem, elem));
    case 'custom':
      const {component, componentProps} = element;
      if (component(componentProps) instanceof Array) {
        throw `Custom components are not allowed to have multiple children`;
      }
      currentRenderId = element._id;
      element.children = [component(componentProps)];
      element.mount = parent.mount;
      
      return constructTree(element.children[0], parent);
    default:
      console.error({element})
      throw 'no type';
  }
};

// const getParent = (elem, currentParent = globalState, currentElem = globalState) => {
//   if (currentElem._id === elem._id) return currentParent;
//   for (const child of currentElem.children) {
//     return getParent(elem, currentElem, child);
//   }
//   throw "can't find parent";
// }

const getComponentById = (id, elem = globalState) => {
  if (!elem) return undefined;
  // if (elem.type === 'primitive') return 
  if (elem._id === id) return elem;
  return elem.children.find(el => getComponentById(id, el))
}

// TODO: implement
let currentRenderId;
let stateCounter = 0;
export const useState = initialValue => {
  if (constructingTree) return [initialValue, () => {}];
  const {state, ...component} = getComponentById(currentRenderId);
  if (!state.length) {
    // if (stateCounter !== 0) throw 'WTF';
    state[stateCounter] = initialValue;
  }

  const setState = newValue => {
    state[stateCounter] = newValue;
    component.mount.replaceWith(render(component));
  };
  stateCounter++
  return [state[stateCounter - 1], setState];
}

const render = (element, renderedCustom = false) => {
  if (!element) element = {type: undefined};
  switch (element.type) {
    // base case
    case undefined:
      return document.createTextNode(element ?? '');
    // dom node
    case 'primitive':
      return renderDomNode(element);
    // custom component
    case 'custom':
      // TODO: do props diffing
      if (!renderedCustom) {
        // Only need to construct the tree at top level.. I think
        const _id = element._id;
        constructTree(element);
        element._id = _id;
      }
      // probably needs to track state here
      return render(element.children[0], true);
  }
};

export const dom = new Proxy({}, {
  get(_, domType) {
    return domProps => (...children) =>
      ({type: 'primitive', domType, domProps, children, mount: null});
  }
});

const renderDomNode = node => {
  const {domType, domProps, children} = node;
  const elem = document.createElement(domType);
  for (const key in domProps) {
    if (key === 'className') {
      elem.classList.add(domProps[key]);
    } else {
      if (key === 'onClick') console.log('bind onClick');
      elem[key.toLowerCase()] = domProps[key];
    }
  }
  for (const child of children) {
    elem.appendChild(render(child));
  }
  node.mount = elem;
  return elem;
};

// EXAMPLES

const Header = Component(({id, children}) => (
  dom.header({id})(...children)
));

const App = Component(() => {
  const [count, setCount] = useState(0);
  console.log('App render', count, setCount)
  return Header({id: 'header'})(
    dom.h1()('Counter:'),
    dom.div()(count),
    dom.button({onClick: () => (console.log('click', setCount), setCount(count + 1))})('+')
  )
});

mount(
  App()(),
  document.getElementById('root')
);

console.log({state: globalState});