import { createElement, setInitialProperties } from "./ReactDOMComponent";

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