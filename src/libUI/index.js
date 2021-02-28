let idCounter = 0;
const states = {};

export const mount = (component, elem) =>
  elem.appendChild(render(component));

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

const morph = (oldElem, newElem) => {
  // 1. should be a dom diff..??
  oldElem.parentElement.replaceChild(newElem, oldElem);
  // morphAttrs(oldElem, newElem, id);
  // if (blah) render text?
}

const updateState = (newValue, state) => {
  if (typeof newValue === 'function') {
    return newValue(state);
  } else {
    return newValue;
  }
};

// TODO: take out useEffect
export const withState = component => {
  const id = idCounter++;
  states[id] = states[id] || {states: [], props: undefined};
  let stateCounter = 0;
  const useState = initialValue => {
    states[id].states[stateCounter] = states[id].states[stateCounter] || initialValue;
    const setState = currentStateCounter => newValue => {
      states[id].states[currentStateCounter] = updateState(newValue, states[id].states[currentStateCounter]);
      const newElem = render(() => {
        stateCounter = 0;
        return () => component({...states[id].props, useState})(id);
      });
      const oldElem = document.querySelector(`[data-lib-ui-id="${id}"]`);
      morph(oldElem, newElem);
    }
    stateCounter++;
    return [states[id].states[stateCounter - 1], setState(stateCounter - 1)];
  };

  return props => {
    states[id].props = states[id].props || props;
    stateCounter = 0;
    return () => component({...states[id].props, useState})(id);
  };
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
        for (let key in props) {
          if (key === 'className') {
            elem.classList.add(props[key]);
          } else {
            elem[key.toLowerCase()] = props[key];
          }
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