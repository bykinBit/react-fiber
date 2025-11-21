const randomKey = Math.random().toString(36).slice(2);
const internalEventHandlersKey = '_reactEvents$' + randomKey;
export const internalInstanceKey = '__reactFiber$' + randomKey;
export const internalPropsKey = '__reactProps$' + randomKey;
export function getEventListenerSet(node: any) {
    let elementListenerSet = node[internalEventHandlersKey]
    if (!elementListenerSet) {
        elementListenerSet = node[internalEventHandlersKey] = new Set();
    }
    return elementListenerSet;
}
export function getClosestInstanceFromNode(targetNode:any){
    return targetNode[internalInstanceKey];
}
export function getFiberCurrentPropsFromNode(targetNode:any){
    return targetNode[internalPropsKey];
}