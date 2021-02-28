import {hash} from './utils';
import {dom} from '.';

// create a stylesheet instead of using style prop
const styledStyleSheet = document.createElement('style');
document.body.appendChild(styledStyleSheet);
const styled = new Proxy({}, {
  get(target, prop) {
    return (strArr, ...funcs) => (props = {}) => {
      let style = strArr[0];
      for (let i = 1; i < strArr.length; i++) {
        style += funcs[i - 1](props) + strArr[i];
      }
      const className = `l${hash(style)}`;
      styledStyleSheet.sheet.insertRule(`.${className} {${style}}`);
      return dom[prop]({...props, className});
    };
  }
});

export default styled;