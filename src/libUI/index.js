let idCounter = 0;
const states = {};

export const mount = (component, elem) =>
  elem.appendChild(render(component));

// create a stylesheet instead of using style prop
export const styled = new Proxy({}, {
  get(target, prop) {  
    return (strArr, ...funcs) => (props = {}) => {
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

const morphAttrs = (oldElem, newElem, id) => {
  // in future do diffs
  for (let prop of newElem.attributes) {
    oldElem.setAttribute(prop.name, prop.value);
  }
  // in future do diffs
  for (let [prop, value] of Object.entries(states[id]?.domProps || {})) {
    oldElem[prop] = value;
  }
  // assuming same # of children
  for (let i = 0; i < newElem.children.length; i++) {
    morphAttrs(oldElem.children[i], newElem.children[i]);
  }
};


// TODO: take out useEffect
export const withState = (initState, component) => {
  const id = idCounter++;
  states[id] = states[id] || {state: initState, props: undefined, effectConds: undefined};

  // TODO: this is broken
  const useEffect = (func, conditions) => {
    if (!states[id].effectConds) {
      func();
    } else {
      const condChange = conditions.zip(states[id].effectConds)
        .some(([oldCond, newCond]) => oldCond !== newCond);
      if (condChange) func();
    }
    states[id].effectConds = conditions;
  }
  const setState = newValue => {
    // TODO: default value is not stored in `states[id]` so the first render will be wrong
    states[id].state = typeof newValue === 'function'
      ? newValue(states[id].state)
      : newValue;
    // states[id].state = newValue;
    const newElem = render(() => () => component({...states[id].props, state: states[id].state, setState, useEffect})(id));
    const oldElem = document.querySelector(`[data-lib-ui-id="${id}"]`);
    // 1. should be a dom diff..??
    oldElem.parentElement.replaceChild(newElem, oldElem);
    // morphAttrs(oldElem, newElem, id);
    // if (blah) render text?
    
  }
    return props => {
      states[id].props = props || states[id].props;
    return () => component({...states[id].props, state: states[id].state, setState, useEffect})(id);
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

// {
//   state: '3',
//   domProps: 2,
//   domChildren: [

//   ]
// }

// start using shadow dom

// morph(old, new) = 
//   // diffprops checks html props & lib-ui props
//   if (diffProps(old, new)) {
//     morphProps(old, new);
//     newChildren, oldChildren
//     newChildren.zip(oldChildren)
//       .forEach(morph);
//   }

export const dom = new Proxy({}, {
  get(target, prop, receiver) {
    return props => (...contents) => {
      return id => {
        const elem = document.createElement(prop);
        if (id !== undefined) states[id].domProps = states[id].domProps || {};
        for (const key in props) {
          elem[key.toLowerCase()] = props[key];
          if (id !== undefined) states[id].domProps[key.toLowerCase()] = props[key];
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