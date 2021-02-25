let rootComponent, rootElem;

let idCounter = 0;

const states = {};

export const mount = (component, elem) => {
  rootComponent = component;
  rootElem = elem;
  elem.appendChild(render(component));
};

export const withState = component => {
  const id = idCounter++;
  states[id] = states[id] || {state: undefined};
  const setState = newValue => {
    states[id].state = newValue;
    // TODO: gross
    rootElem.innerHTML = '';
    mount(rootComponent, rootElem);
  }
  return () => component({state: states[id].state, setState});
};

const render = elem => {
  switch (typeof elem) {
    case 'number':
    case 'string':
    case 'undefined':
      return document.createTextNode(elem ?? '');
    case 'function':
      return render(elem());
    case 'object': // TODO check if HTMLElement directly
      return elem;
  }
};


export const dom = new Proxy({}, {
  get(target, prop, receiver) {
    return props => (...contents) => {
      return () => {
        const elem = document.createElement(prop);
        for (const key in props) {
          elem[key.toLowerCase()] = props[key];
        }
        for (const content of contents) {
          elem.appendChild(render(content));
        }
        return elem;
      };
    };
  }
});