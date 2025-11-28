import { createElement, setInitialProperties,diffProperties } from "./ReactDOMComponent";

export function shouldSetTextContent(type:any,pendingProps:any){
    return typeof pendingProps.children==='string'||typeof pendingProps.children==='number';
}
export function createInstance(type:any,props:any){
    return createElement(type)
}
export function finalizeInitialChildren(domElement:any,type:any,props:any){
    setInitialProperties(domElement,type,props)
}
export function appendChild(parentInstance:any,child:any){
    parentInstance.appendChild(child);
}
export function insertBefore(parentInstance:any,child:any,before:any){
    parentInstance.insertBefore(child,before);
}
export function prepareUpdate(domElement:any,type:any,oldProps:any,newProps:any){
    return diffProperties(domElement,type,oldProps,newProps);
}
export function removeChild(parentInstance:any,child:any){
    return parentInstance.removeChild(child);
}