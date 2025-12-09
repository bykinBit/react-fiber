import { REACT_ELEMENT,REACT_FORWARD_REF_TYPE } from "./constant";
import { wrapToVdom } from "./utils";
import {Component} from './Component'
function createElement(type: any, config: any, ...children: any) {
    let ref;
    let key;
    if(config){
        delete config.__source;
        delete config.__self;
        ref=config.ref;
        delete config.ref;
        key=config.key;
        delete config.key;
    }
    let props={...config}
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
function createRef(){
    return {current:null} as any;
}
// Explicitly type as any so TS treats the returned forwardRef component as a
// valid JSX element type (our runtime object is not callable).
function forwardRef(render:any): any{
    return {
        $$typeof:REACT_FORWARD_REF_TYPE,
        render
    }
}
const Fragment = "fragment";
const React={
    createElement,
    Component,
    createRef,
    forwardRef,
    Fragment
}
export default React;