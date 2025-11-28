import { updateProperties } from "./ReactDOMComponent";
import { appendChild, removeChild, insertBefore } from "./ReactDOMHostConfig";
import { Placement } from "./ReactFiberFlags";
import { HostComponent, HostRoot } from "./ReactWorkTags";

function getParentStateNode(fiber: any) {
    let parent = fiber.return;
    do {
        if (parent.tag === HostComponent) {
            return parent.stateNode;
        } else if (parent.tag === HostRoot) {
            return parent.stateNode.containerInfo
        } else {
            parent = parent.return;
        }
    } while (parent);
}
function getHostSibling(fiber: any) {
    let node = fiber.sibling;
    while (node) {
        if (!(node.flags & Placement)) {
            return node.stateNode;
        }
        node = node.sibling;
    }
    return null;
}
export function commitPlacement(nextEffect: any) {
    let stateNode = nextEffect.stateNode;
    let parentStateNode = getParentStateNode(nextEffect);
    let before = getHostSibling(nextEffect);
    console.log(before);
    if (before) {
        insertBefore(parentStateNode, stateNode, before)
    } else {
        appendChild(parentStateNode, stateNode);
    }
}
export function commitWork(current: any, finishedWork: any) {
    const updatePayload = finishedWork.updateQueue;
    finishedWork.updateQueue = null;
    if (updatePayload) {
        updateProperties(current.stateNode, updatePayload)
    }
}
export function commitDeletion(fiber: any) {
    if (!fiber) {
        return;
    }
    let parentStateNode = getParentStateNode(fiber.nextEffect);
    removeChild(parentStateNode, fiber.stateNode)
}