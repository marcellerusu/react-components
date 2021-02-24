export const Component = component => {
  return component();
};

export const mount = (component, elem) => {
  elem.appendChild(render(component));
};


const render = thing => {
  switch (typeof thing) {
    case 'number':
    case 'string':
      return document.createTextNode(thing);
    case 'function':
      return render(thing());
    case 'object':// TODO check if HTMLELement directly
      return thing;
  }
};

export const dom = new Proxy({}, {
  get(target, prop, receiver) {
    return props => contents => {
      // TODO: hack for template strings
      contents = contents instanceof Array ? contents[0] : contents;
      return () => {
        const elem = document.createElement(prop);
        for (const key in props) {
          elem[key.toLowerCase()] = props[key];
        }
        elem.appendChild(render(contents));
        return elem;
      };
    };
  }
});