import { FunctionComponent, HostComponent, IndeterminateComponent } from './ReactWorkTags'
import { renderWithHooks } from './ReactFiberHooks'
declare global {
    interface Window {
        counter: any;
    }
}
//开始构建
export function beginWork(current: any, workInProgress: any) {
    if (current) {//判断是挂载还是更新
        switch (workInProgress.tag) {
            case FunctionComponent:
                return updateFunctionComponent(current, workInProgress, workInProgress.type);
            default:
                break;
        }

    } else {
        switch (workInProgress.tag) {
            case IndeterminateComponent:
                return mountIndeterminateComponent(current, workInProgress, workInProgress.type);
            default:
                break;
        }
    }

}
function updateFunctionComponent(current: any, workInProgress: any, Component: any) {
    let newChildren = renderWithHooks(current, workInProgress, Component);
    console.log(newChildren);
    window.counter = newChildren;
    workInProgress.tag = FunctionComponent;
    reconcileChildren(current, workInProgress, newChildren);
    return workInProgress.child;
}
function mountIndeterminateComponent(current: any, workInProgress: any, Component: any):any {
    let children = renderWithHooks(current, workInProgress, Component);
    console.log(children);
    window.counter = children;
    workInProgress.tag = FunctionComponent;
    reconcileChildren(current, workInProgress, children);
    return null;
}
function reconcileChildren(current: any, workInProgress: any, children: any) {
    let prevFiber: any = null;
    for (let i = 0; i < children.length; i++) {
        let fiber = {
            tag: children[i].tag,
            type: children[i].type
        }
        if (prevFiber === null) {
            workInProgress.child = fiber;
        } else {
            prevFiber.sibling = fiber;
        }
        prevFiber = fiber;
    }
}