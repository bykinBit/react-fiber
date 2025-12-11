import { REACT_FORWARD_REF_TYPE, REACT_TEXT } from "../constant";
import { addEvent } from "../event";
function updateProps(dom: any, oldProps = {}, newProps: any) {
    for (let key in newProps) {
        if (key === 'children') {
            continue;
        } else if (key === 'style') {
            let styleObject = newProps[key];
            for (const attr in styleObject) {
                dom.style[attr] = styleObject[attr];
            }
        } else if (/^on[A-Z].*/.test(key)) {
            // dom[key.toLowerCase()]=newProps[key]
            addEvent(dom, key, newProps[key])
        } else {
            dom[key] = newProps[key];
        }
    }
    for (let key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            dom[key] = null;
        }
    }
}
function reconcileChildren(childrenVdom: any, parentDOM: any) {
    for (let i = 0; i < childrenVdom.length; i++) {
        childrenVdom[i].mountIndex=i;
        mount(childrenVdom[i], parentDOM);
    }
}
function mountFunctionComponent(vdom: any): any {
    const { type, props } = vdom;
    const renderVdom = type(props);
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom)
}
function mountForwardComponent(vdom: any): any {
    const { type, props, ref } = vdom;
    const renderVdom = type.render(props, ref);
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
}
function mountClassComponent(vdom: any): any {
    const { type, props, ref } = vdom;
    const defaultProps = type.defaultProps;
    const resolveProps = { ...defaultProps, ...props };
    const classInstance = new type(resolveProps);
    vdom.classInstance = classInstance;
    if (ref) ref.current = classInstance;
    if (classInstance.UNSAFE_componentWillMount) {
        classInstance.UNSAFE_componentWillMount();
    }
    const renderVdom = classInstance.render();
    classInstance.oldRenderVdom = renderVdom;
    let dom = createDOM(renderVdom);
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
    }
    return dom;
}
function createDOM(vdom: any) {
    const { type, props, ref } = vdom;
    let dom;
    if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
        return mountForwardComponent(vdom);
    } else if (type === REACT_TEXT) {
        dom = document.createTextNode(props);
    } else if (typeof type === 'function') {
        // Distinguish between class and function components
        if (type.isReactComponent) {
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom);
        }
    } else {
        dom = document.createElement(type);
    }
    if (typeof props === 'object') {
        updateProps(dom, {}, props);
        if (props.children) {
            if (typeof props.children === 'object' && props.children.type) {
                props.children.mountIndex=0;
                mount(props.children, dom)
            } else if (Array.isArray(props.children)) {
                reconcileChildren(props.children, dom);
            }
        }
    }
    vdom.dom = dom;
    if (ref) {
        ref.current = dom;
    }
    return dom;
}
function mount(vdom: any, container: any) {
    const newDOM = createDOM(vdom);
    container.appendChild(newDOM);
    if (newDOM.componentDidMount) {
        newDOM.componentDidMount();
    }
}
export function findDOM(vdom: any) {
    if (!vdom) return null;
    if(vdom.dom){
        return vdom.dom;
    }else{
        const renderVdom=vdom.classInstance?vdom.classInstance.oldRenderVdom:vdom.oldRenderVdom;
        return findDOM(renderVdom);
    }
    
}
export function compareTwoVdom(parentDOM: any, oldVdom: any, newVdom: any, nextDOM?: any) {
    if (!oldVdom && !newVdom) return;
    if (oldVdom && !newVdom) {
        unMountVdom(oldVdom);
    } else if (!oldVdom && newVdom) {
        let newDOM = createDOM(newVdom);
        if (nextDOM) {
            parentDOM.insertBefore(newDOM,nextDOM);
        } else {
            parentDOM.appendChild(newDOM);
        }
        if (newDOM.componentDidMount) {
            newDOM.componentDidMount();
        }
    }else if(oldVdom&&newVdom&&(oldVdom.type!==newVdom.type)){
        unMountVdom(oldVdom);
        let newDOM=createDOM(newVdom);
        if (nextDOM) {
            parentDOM.insertBefore(newDOM,nextDOM);
        } else {
            parentDOM.appendChild(newDOM);
        }
        if(newDOM.componentDidMount){
            newDOM.componentDidMount();
        }
    }else{
        updateElement(oldVdom,newVdom);
    }
    // let oldDOM=findDOM(oldVdom);
    // let newDOM=createDOM(newVdom);
    // parentDOM.replaceChild(newDOM,oldDOM);
}
function updateElement(oldVdom:any,newVdom:any){
    if(oldVdom.type===REACT_TEXT){
        let currentDOM=newVdom.dom=findDOM(oldVdom);
        if(oldVdom.props!==newVdom.props){
            currentDOM.textContent=newVdom.props;
        }
        return;
    }else if(typeof oldVdom.type==='string'){
        let currentDOM=newVdom.dom=findDOM(oldVdom);
        updateProps(currentDOM,oldVdom.props,newVdom.props);
        updateChildren(currentDOM,oldVdom.props.children,newVdom.props.children);
    }else if(typeof oldVdom.type==='function'){
        if(oldVdom.type.isReactComponent){
            updateClassComponent(oldVdom,newVdom);
        }else{
            updateFunctionComponent(oldVdom,newVdom);
        }
    }
}
function updateFunctionComponent(oldVdom:any,newVdom:any){
    let currentDOM=findDOM(oldVdom);
    if(!currentDOM)return;
    let parentDOM=currentDOM.parentNode;
    const {type,props}=newVdom;
    const newRenderVdom=type(props);
    compareTwoVdom(parentDOM,oldVdom.oldRenderVdom,newRenderVdom);
    newVdom.oldRenderVdom=newRenderVdom;
}
function updateClassComponent(oldVdom:any,newVdom:any){
    // let currentDOM=findDOM(oldVdom);
    let classInstance=newVdom.classInstance=oldVdom.classInstance;
    if(classInstance.UNSAFE_componentWillReceiveProps){
        classInstance.UNSAFE_componentWillReceiveProps(newVdom.props);
    }
    classInstance.updater.emitUpdate(newVdom.props);

}
function updateChildren(parentDOM:any,oldVChildren:any,newVChildren:any){
    oldVChildren=Array.isArray(oldVChildren)?oldVChildren:[oldVChildren];
    newVChildren=Array.isArray(newVChildren)?newVChildren:[newVChildren];
    const keyedOldMap=new Map();
    let lastPlacedIndex=-1;
    oldVChildren.forEach((oldChild:any,index:number)=>{
        let oldKey=oldChild.key?oldChild.key:index;
        keyedOldMap.set(oldKey,oldChild);
    });
    let patch=[] as any;
    newVChildren.forEach((newVChild:any,index:number)=>{
        newVChild.mountIndex=index;
        let newKey=newVChild.key?newVChild.key:index;
        let oldVChild=keyedOldMap.get(newKey);
        if(oldVChild){
            updateElement(oldVChild,newVChild);
            if(oldVChild.mountIndex<lastPlacedIndex){
                patch.push({
                    type:'MOVE',
                    oldVChild,
                    newVChild,
                    mountIndex:index
                });
            }
            keyedOldMap.delete(newKey);
            lastPlacedIndex=Math.max(oldVChild.mountIndex,lastPlacedIndex);
        }else{
            patch.push({
                type:'PLACEMENT',
                newVChild,
                mountIndex:index
            });
        }
    });
    const moveVChildren=patch.filter((action:any)=>action.type==='MOVE').map((action:any)=>action.oldVChild);
    [...keyedOldMap.values()].concat(moveVChildren).forEach((oldVChild:any)=>{
        let currentDOM=findDOM(oldVChild);
        parentDOM.removeChild(currentDOM);
    });
    patch.forEach((action:any)=>{
        const {type,oldVChild,newVChild,mountIndex}=action;
        let oldTrueDOMs=parentDOM.childNodes;
        if(type==='PLACEMENT'){
            let newDOM=createDOM(newVChild);
            let oldTrueDOM=oldTrueDOMs[mountIndex];
            if(oldTrueDOM){
                parentDOM.insertBefore(newDOM,oldTrueDOM);
            }else{
                parentDOM.appendChild(newDOM);
            }

        }else if(type==='MOVE'){
            let oldDOM=findDOM(oldVChild);
            let oldTrueDOM=oldTrueDOMs[mountIndex];
            if(oldTrueDOM){
                parentDOM.insertBefore(oldDOM,oldTrueDOM);
            }else{
                parentDOM.appendChild(oldDOM);
            }
        }
    });
    // let maxLength=Math.max(oldVChildren.length,newVChildren.length);
    // for(let i=0;i<maxLength;i++){
    //     let nextVdom=oldVChildren.find((item:any,index:number)=>index>i&&item&&findDOM(item));
    //     compareTwoVdom(parentDOM,oldVChildren[i],newVChildren[i],findDOM(nextVdom));
    // }
}
function unMountVdom(vdom: any) {
    const { props, ref } = vdom;
    const currentDOM = findDOM(vdom);
    if (vdom.classInstance && vdom.classInstance.UNSAFE_componentWillUnmount) {
        vdom.classInstance.UNSAFE_componentWillUnmount();
    }
    if (ref) {
        ref.current = null;
    }
    if (props.children) {
        const children = Array.isArray(props.children.length) ? props.children : [props.children];
        children.forEach(unMountVdom);
    }
    if (currentDOM) currentDOM.remove();
}
class DOMRoot {
    container: any;
    constructor(container: any) {
        this.container = container;
    }
    render(vdom: any) {
        mount(vdom, this.container);
    }
}
function createRoot(container: any) {
    return new DOMRoot(container)
}
const ReactDOM = {
    createRoot
}
export default ReactDOM;