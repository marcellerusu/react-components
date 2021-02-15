import {useMemo} from 'react';

import {useFreshState} from '../../util/hooks';

const firstCapital = (first, ...rest) => first.toUpperCase() + rest.join('');

const EMAIL = Symbol('EMAIL');
const TEXT = Symbol('TEXT');
const FILE = Symbol('FILE');
const SELECT = Symbol('SELECT');
const NUMBER = Symbol('NUMBER');

const TypeConstructor = (__type, value, required = false) => ({__type, value, required, valid: false});

export const Email = {
  of(value, required = true) {
    return TypeConstructor(EMAIL, value, required);
  }
};

export const Text = {
  of(value, required = true) {
    return TypeConstructor(TEXT, value, required);
  }
};

export const Number = {
  of(value, required = true) {
    return TypeConstructor(NUMBER, value, required);
  }
};

// Email

const construct = value => {
  if (value.__type) return value;
  if (typeof value === 'string') {
    return Text.of(value);
  } else if (typeof value === 'number') {
    return Number.of(value);
  }
};

const deconstruct = valueOrType => {
  if (valueOrType.__type) return valueOrType.value;
  return valueOrType;
};

const update = (internalValue, domValue) => {
  return TypeConstructor(internalValue.__type, domValue);
};

const constructFrom = options =>
  Object.fromEntries(Object.keys(options).map(k => [k, construct(options[k])]));

const getDomType = ({__type}) => {
  switch (__type) {
    case EMAIL: return 'email';
    case TEXT: return 'text';
    case NUMBER: return 'number';
  }
};

export const useFormState = (options, watch = []) => {
  const [state, setState] = useFreshState(constructFrom(options), watch);

  const onChange = key => e =>
    setState(old => ({...old, [key]: update(state[key], e.target.value)}));

  const formState = useMemo(() => {
    const _formState = {}
    for (const key in state) {
      _formState[key] = {
        value: deconstruct(state[key]),
        type: getDomType(state[key]),
        onChange: onChange(key),
        placeholder: `${firstCapital(...key)}...`,
        required: state[key].required,
      };
    }
    return _formState;
  }, [options]);

  return formState;
};
