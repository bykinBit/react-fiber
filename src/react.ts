import { REACT_CONTEXT, REACT_ELEMENT,REACT_FORWARD_REF_TYPE, REACT_MEMO, REACT_PROVIDER } from "./constant";
import { wrapToVdom,shallowEqual } from "./utils";
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
function createContext(){
    let context={_currentValue:undefined} as any;
    context.Provider={
        $$typeof:REACT_PROVIDER,
        _context:context

    } as any;
    context.Consumer={
        $$typeof:REACT_CONTEXT,
        _context:context
    } as any;
    return context;
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
function cloneElement(element:any,newProps:any,...newChildren:any){
    let props={...element.props,...newProps}
    if(newChildren.length>1){
        props.children=newChildren.map(wrapToVdom);
    }else if(newChildren.length===1){
        props.children=wrapToVdom(newChildren[0]);
    }
    return {
        ...element,
        props
    }
}
// Explicitly type as any so TS treats the returned memoized component as a
// valid JSX element type (our runtime object is not callable).
function memo(type:any,compare=shallowEqual): any{
    return {
        $$typeof:REACT_MEMO,
        type,
        compare
    }
}
class PureComponent extends Component{
    shouldComponentUpdate(newProps:any,nextState:any){
        return !shallowEqual(this.props,newProps)||!shallowEqual(this.state,nextState);
    }
}
const Fragment = "fragment";
const React={
    createElement,
    Component,
    createRef,
    forwardRef,
    createContext,
    cloneElement,
    PureComponent,
    memo,
    Fragment
}
export default React;