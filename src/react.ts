import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
const RESERVED_PROPS = [] as any;
function createElement(type: string, config: any, ...children: any) {
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
  const childrenLength = children.length;
  if (childrenLength === 1) {
    props.children = children[0];
  } else if (childrenLength > 1) {
    // const childrenArray=new Array(childrenLength)
    const childrenArray = Array.from({ length: childrenLength });
    for (let i = 0; i < childrenLength; i++) {
      childrenArray[i] = children[i];
    }
    props.children = childrenArray;
  }
  console.log(props);
  
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
