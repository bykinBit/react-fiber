import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
const RESERVED_PROPS = [] as any;
function createElement(type: string, config: any, children: any) {
  let propName: any;
  const props = {} as any;
  let key = null;
  let ref = null;
  if (config) {
    if (config.key) {
      key = config.key;
    }
    if (config.ref) {
      ref = config.ref;
    }
    for (propName in config) {
      if (!RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childrenArray = new Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childrenArray[i] = arguments[i + 2];
    }
    props.children = childrenArray;
  }
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  };
}
const React = {
  createElement,
};
export default React;
