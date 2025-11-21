import {listenToAllSupportedEvents} from './DOMPluginEventSystem'
import {internalInstanceKey,internalPropsKey} from './ReactDomComponentTree';
import { HostComponent } from './ReactWorkTags';
function render(vdom:any,container:any){
    listenToAllSupportedEvents(container);
    mount(vdom,container);
}
function mount(vdom:any,parentDOM:any){
    let newDOM=createDOM(vdom,parentDOM);
    parentDOM.appendChild(newDOM);
}
function createDOM(vdom:any,parentDOM:any){
    const {type,props}=vdom;
    let dom:any;
    if(typeof vdom==='string'||typeof vdom==='number'){
        dom=document.createTextNode(vdom as any);
    }else{
        dom=document.createElement(type);
    }
    let returenFiber=parentDOM[internalInstanceKey]||null;
    let fiber={tag:HostComponent,type,stateNode:dom,return:returenFiber};
    dom[internalInstanceKey]=fiber;
    dom[internalPropsKey]=props;
    if(props){
        updateProps(dom,{},props)
        if(Array.isArray(props.children)){
            reconcileChildren(props.children,dom);
        }else{
            mount(props.children,dom);
        }
    }
    return dom;
}
function updateProps(dom:any,oldProps:any,newProps:any){

}
function reconcileChildren(children:any,parentDOM:any){
    children.forEach((child:any)=>mount(child,parentDOM));
}
const ReactDOM={
    render
} as any;
export default ReactDOM;