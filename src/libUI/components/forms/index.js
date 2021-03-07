import TypeConstructors, {construct, deconstruct, cast, getDomType} from './types';
import {firstCapital} from './utils';

const update = (internalValue, domValue) => {
  const value = cast(internalValue, domValue);
  return {...internalValue, value};
};

const constructFrom = options => Object.mapValues(options, construct);
const constructUserState = state => Object.mapValues(state, ({value}) => value);

const FORM_PREFIX = '__react-cms-form';
const createId = key => `${FORM_PREFIX}_${key}`;

const useForm = (options, onSubmit, useState) => {
  // TODO: we should pass in something to the watch arr
  const [state, setState] = useState(constructFrom(options), []);
  const onChange = key => e =>
    setState(old => ({...old, [key]: update(state[key], e.target.value)}));

  const formState = () => {
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
  };

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