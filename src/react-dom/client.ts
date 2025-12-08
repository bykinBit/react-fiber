import { REACT_TEXT } from "../constant";
function updateProps(dom:any,oldProps={},newProps:any){
    for(let key in newProps){
        if(key==='children'){
            continue;
        }else if(key==='style'){
            let styleObject=newProps[key];
            for(const attr in styleObject){
                dom.style[attr]=styleObject[attr];
            }
        }else if(/^on[A-Z].*/.test(key)){
            dom[key.toLowerCase()]=newProps[key]
        }else{
            dom[key]=newProps[key];
        }
    }
    for(let key in oldProps){
        if(!newProps.hasOwnProperty(key)){
            dom[key]=null;
        }
    }
}
function reconcileChildren(childrenVdom:any,parentDOM:any){
    for(let i=0;i<childrenVdom.length;i++){
        mount(childrenVdom[i],parentDOM);
    }
}
function mountFunctionComponent(vdom:any):any{
    const {type,props}=vdom;
    const renderVdom=type(props);
    vdom.oldRenderVdom=renderVdom;
    return createDOM(renderVdom)
}
function mountClassComponent(vdom:any):any{
    const {type,props}=vdom;
    const classInstance=new type(props);
    const renderVdom=classInstance.render();
    classInstance.oldRenderVdom=renderVdom;
    return createDOM(renderVdom);
}
function createDOM(vdom:any){
    const {type,props}=vdom;
    let dom;
    if(type===REACT_TEXT){
        dom=document.createTextNode(props);
    }else if(typeof type==='function'){
        // Distinguish between class and function components
        if(type.isReactComponent){
            return mountClassComponent(vdom);
        }else{
            return mountFunctionComponent(vdom);
        }
    }else{
        dom=document.createElement(type);
    }
    if(typeof props==='object'){
        updateProps(dom,{},props);
        if(props.children){
            if(typeof props.children==='object'&&props.children.type){
                mount(props.children,dom)
            }else if(Array.isArray(props.children)){
                reconcileChildren(props.children,dom);
            }
        }
    }
    vdom.realDom=dom;
    return dom;
}
function mount(vdom:any,container:any){
    const newDOM=createDOM(vdom);
    container.appendChild(newDOM);
}
export function findDOM(vdom:any){
    if(!vdom)return null;
    return vdom.realDom;
}
export function compareTwoVdom(parentDOM:any,oldVdom:any,newVdom:any){
    let oldDOM=findDOM(oldVdom);
    let newDOM=createDOM(newVdom);
    parentDOM.replaceChild(newDOM,oldDOM);
}
class DOMRoot{
    container:any;
    constructor(container:any){
        this.container=container;
    }
    render(vdom:any){
        mount(vdom,this.container);
    }
}
function createRoot(container:any){
    return new DOMRoot(container)
}
const ReactDOM={
    createRoot
}
export default ReactDOM;