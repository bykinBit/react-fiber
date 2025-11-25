import { mountChildFibers, reconcileChildFibers } from './ReactChildFiber';
import { HostComponent, HostRoot } from './ReactWorkTags'
export function beginWork(current: any, workInProgress: any) {
    switch (workInProgress.tag) {
        case HostRoot:
            return updateHostRoot(current, workInProgress);
        case HostComponent:
            return updateHostComponent(current, workInProgress);
        default:
            break;
    }
}
function updateHostRoot(current: any, workInProgress: any) {
    const updateQueue = workInProgress.updateQueue;
    const nextChildren = updateQueue.shared.pending.payload.element;
    reconcileChildren(current, workInProgress, nextChildren);
    return workInProgress.child;

}
function updateHostComponent(current: any, workInProgress: any) {
    const type = workInProgress.type;
    const nextProps = workInProgress.pendingProps;
    let nextChildren = nextProps.children;
    reconcileChildren(current, workInProgress, nextChildren);
    return workInProgress.child;
}
export function reconcileChildren(current: any, workInProgress: any, nextChildren: any) {
    if (current) {
        workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
    } else {
        workInProgress.child = mountChildFibers(workInProgress, current && current.child, nextChildren);
    }
}