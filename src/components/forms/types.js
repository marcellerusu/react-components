const TypeConstructor = (__type, value, required = false, wrap = x => x, unwrap = x => x) =>
  ({__type, value, required, wrap, unwrap});

const TypeConstructors = {
  Email: {
    of(value, required = true) {
      return TypeConstructor(EMAIL, value, required);
    }
  },
  Text: { // TODO: come up with a better name
    of(value, required = true) {
      return TypeConstructor(TEXT, value, required);
    }
  },
  Float: {
    of(value, required = true) {
      return TypeConstructor(FLOAT, value, required);
    }
  },
  // TODO: Interesting idea, add attributes property that will get passed through to the input element
  CustomType: (wrap, unwrap) => ({
    of(value, required = true) {
      return TypeConstructor(CUSTOM, wrap(value), required, wrap, unwrap);
    }
  }),
}

const EMAIL = Symbol('EMAIL');
const TEXT = Symbol('TEXT');
const FILE = Symbol('FILE');
const SELECT = Symbol('SELECT');
const FLOAT = Symbol('FLOAT');
const CUSTOM = Symbol('CUSTOM');


export const construct = value => {
  if (value.__type) return value;
  if (typeof value === 'string') {
    return TypeConstructors.Text.of(value);
  } else if (typeof value === 'number') {
    return TypeConstructors.Float.of(value);
  }
  throw new Error(`Can't construct type for ${JSON.stringify(value)}`);
};

export const deconstruct = ({unwrap, value}) => unwrap(value);

export const cast = ({__type, wrap}, domValue) => {
  switch (__type) {
    case FLOAT: return Number(domValue);
    case CUSTOM: return wrap(domValue);
    default: return domValue;
  }
};

export const getDomType = ({__type}) => {
  switch (__type) {
    case EMAIL: return 'email';
    case FLOAT: return 'number';
    default: return 'text';
  }
};


export default TypeConstructors;