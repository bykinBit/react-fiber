import { HostRoot } from './ReactWorkTags'
import {NoFlags} from './ReactFiberFlags'
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
    stateNode:any
    constructor(tag: any, pendingProps: any, key: any) {
        this.tag = tag;
        this.pendingProps = pendingProps;
        this.key = key;
    }
}