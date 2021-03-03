// const state = {
//   _id: 0,
//   componentProps: {},
//   state: ['2', [{email: 'marcelle@rusu.com'}]],
//   type: 'custom',
//   domProps: null,
//   children: [
//     { 
//       componentProps: {},
//       state: null,
//       type: 'div', // either dom type | 'custom' | 'primitive',
//       domProps: {},
//       children: [
//         {
//         }
//       ]
//     }
//   ]
// }


let idCounter = 0;
export const Component = component => {
  return componentProps => ({
    _id: idCounter++,
    componentProps,
    component,
    state: [], // done at run time
    type: 'custom',
    domProps: null,
    children: []
  });
};

export const mount = (component, root) => (
  console.log(render(component)[0]),
  root.appendChild(render(component)[0])
);

const render = element => {
  console.log('render', element);
  switch (element.type) {
    // reached base case
    case 'primitive':
    case undefined:
      console.log({element});
      return document.createTextNode(element);
    // still a component
    case 'custom':
      // probably needs to track state here
      const component = element.component(element.componentProps);
      console.log('component', component)
      if (component.type !== 'custom') {
        element.children = component.children;
      } else {
        element.children = render(component);
      }
      return element.children.map(render);
    // dom element
    default:
      return renderDomNode(element);
  }
};

export const dom = new Proxy({}, {
  get(_, domType) {
    return domProps => (...children) =>
      ({type: domType, domProps, children});
  }
});

const renderDomNode = ({type, domProps, children}) => {
  const elem = document.createElement(type);
  for (const key in domProps) {
    if (key === 'className') {
      elem.classList.add(domProps[key]);
    } else {
      elem[key.toLowerCase()] = domProps[key];
    }
  }
  // console.log({type, domProps, children})
  for (const child of children) {
    elem.appendChild(render(child));
  }
  return elem;
};



const Header = Component(({name}) => (
  dom.header()(name)
));

const App = Component(() => (
  Header({name: 'Hello World!'})
));

const state = App();

mount(state, document.getElementById('root'));

console.log(state);