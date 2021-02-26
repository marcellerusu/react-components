let idCounter = 0;
const states = {};

export const mount = (component, elem) =>
  elem.appendChild(render(component));

// create a stylesheet instead of using style prop
export const styled = new Proxy({}, {
  get(target, prop) {  
    return (strArr, ...funcs) => props => {
      let style = strArr[0];
      for (let i = 1; i < strArr.length; i++) {
        style += funcs[i - 1](props) + strArr[i];
      }
      return dom[prop]({
        ...props,
        style: style + '\n' + props.style
      });
    }
  }
});

export const withState = component => {
  const id = idCounter++;
  states[id] = states[id] || {state: undefined, props: undefined};
  const setState = newValue => {
    // TODO: default value is not stored in `states[id]` so the first render will be wrong
    // states[id].state = typeof newValue === 'function'
    //   ? newValue(states[id].state)
    //   : newValue;
    states[id].state = newValue;
    const newElem = render(() => () => component({...states[id].props, state: states[id].state, setState})(id));
    const oldElem = document.querySelector(`[data-lib-ui-id="${id}"]`);
    oldElem.parentElement.replaceChild(newElem, oldElem);
  }
    return props => {
      states[id].props = props || states[id].props;
      return () => component({...states[id].props, state: states[id].state, setState})(id);
    }
};

const render = (elem) => {
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
      return id => {
        const elem = document.createElement(prop);
        for (const key in props) {
          elem[key.toLowerCase()] = props[key];
        }
        for (const content of contents) {
          elem.appendChild(render(content));
        }
        if (id !== undefined) elem.dataset['libUiId'] = id;
        return elem;
      };
    };
  }
});