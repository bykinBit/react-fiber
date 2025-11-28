import { appendChild, createInstance, finalizeInitialChildren, prepareUpdate } from "./ReactDOMHostConfig";
import { Update } from "./ReactFiberFlags";
import { HostComponent } from "./ReactWorkTags";

export function completeWork(current: any, workInProgress: any) {
    const newProps = workInProgress.pendingProps;
    switch (workInProgress.tag) {
        case HostComponent:
            if (current && workInProgress.stateNode) {
                updateHostComponent(current, workInProgress, workInProgress.tag, newProps);
            } else {
                const type = workInProgress.type;
                const instance = createInstance(type, newProps);
                appendAllChildren(instance, workInProgress);
                workInProgress.stateNode = instance;
                finalizeInitialChildren(instance, type, newProps)
            }
            break;
        default:
            break;
    }
}
function appendAllChildren(parent: any, workInProgress: any) {
    let node = workInProgress.child;
    while (node) {
        if (node.tag === HostComponent) {
            let instance = node.stateNode;
            appendChild(parent, instance)
        }
        if (node === workInProgress) return;
        while (!(node.sibling)) {
            if (!(node.sibling) || node.return === workInProgress) {
                return;
            }
            node = node.return;
        }
        node = node.sibling;
    }
}
function updateHostComponent(current: any, workInProgress: any, tag: any, newProps: any) {
    let oldProps = current.memoizedProps;
    const instance = workInProgress.stateNode;
    const updatePayload = prepareUpdate(instance, tag, oldProps, newProps);
    workInProgress.updateQueue = updatePayload;
    if (updatePayload) {
        workInProgress.flags |= Update;
    }
}