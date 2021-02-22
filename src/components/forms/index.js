import {useMemo} from 'react';

import {useFreshState} from '../../util/hooks';

import TypeConstructors, {construct, deconstruct, cast, getDomType} from './types';
import {firstCapital} from './utils';

const update = (internalValue, domValue) => {
  const value = cast(internalValue, domValue);
  return {...internalValue, value};
};

const constructFrom = options => Object.map(options, construct);
const constructUserState = state => Object.map(state, ({value}) => value);

const FORM_PREFIX = '__react-cms-form';
const createId = key => `${FORM_PREFIX}_${key}`;

const useForm = (options, onSubmit) => {
  // TODO: we should pass in something to the watch arr
  const [state, setState] = useFreshState(constructFrom(options), []);
  const onChange = key => e =>
    setState(old => ({...old, [key]: update(state[key], e.target.value)}));

  const formState = useMemo(() => {
    const _formState = {}
    for (const key in state) {
      _formState[key] = {
        id: createId(key),
        value: deconstruct(state[key]),
        type: getDomType(state[key]),
        onChange: onChange(key),
        placeholder: `${firstCapital(...key)}...`,
        required: state[key].required,
        label: {
          htmlFor: createId(key),
          children: <>{firstCapital(...key)}</>
        }
      };
    }
    return _formState;
  }, [options]);

  const form = {
    onSubmit(e) {
      e.preventDefault();
      onSubmit(constructUserState(state));
    }
  };

  return [formState, form];
};

export const {Email, Float, Str, CustomType} = TypeConstructors;

export default useForm;