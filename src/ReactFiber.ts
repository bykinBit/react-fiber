import { HostComponent, HostRoot } from './ReactWorkTags'
import { NoFlags } from './ReactFiberFlags'
export function createHostRootFiber() {
    return createFiber(HostRoot);
}
function createFiber(tag: any, pendingProps?: any, key?: any) {
    return new FiberNode(tag, pendingProps, key);
}
class FiberNode {
    tag: any;
    pendingProps: any;
    key: any;
    stateNode: any
    constructor(tag: any, pendingProps: any, key: any) {
        this.tag = tag;
        this.pendingProps = pendingProps;
        this.key = key;
    }
}
export function createWorkInProgress(current: any, pendingProps?: any) {
    let workInProgress = current.alternate;
    if (!workInProgress) {
        workInProgress = createFiber(current.tag, pendingProps, current.key);
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;
        workInProgress.alternate = current;
        current.alternate = workInProgress;
    } else {
        workInProgress.pendingProps = pendingProps;
    }
    workInProgress.flags = NoFlags;
    workInProgress.child = null;
    workInProgress.sibling = null;
    workInProgress.updateQueue = current.updateQueue;
    workInProgress.firstEffect = workInProgress.lastEffect = workInProgress.nextEffect = null;
    return workInProgress;
}
export function createFiberFromElement(element:any){
    const {key,type,props}=element;
    let tag;
    if(typeof type==='string'){
        tag=HostComponent;
    }
    const fiber=createFiber(tag,props,key) as any;
    fiber.type=type;
    return fiber;
}