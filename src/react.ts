import { REACT_ELEMENT } from "./constant";
import { wrapToVdom } from "./utils";
import {Component} from './Component'
function createElement(type: any, config: any, ...children: any) {
    if(config){
        delete config.__source;
        delete config.__self;
    }
    let props={...config}
    let ref;
    let key;
    const childrenLen=children.length;
    if(childrenLen>1){
        props.children=children.map(wrapToVdom)
    }else{
        props.children=wrapToVdom(children[0]);
    }
    return {
        $$typeof:REACT_ELEMENT,
        type,
        props: props || {},
        ref,
        key
    };
}

const Fragment = "fragment";
const React={
    createElement,
    Component,
    Fragment
}
export default React;