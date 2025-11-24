export function scheduleUpdateOnFiber(fiber:any){
    const fiberRoot=markUpdateLaneFromFiberToRoot(fiber);
    performSyncWorkOnRoot(fiberRoot);
}
function performSyncWorkOnRoot(fiberRoot:any){
    console.log(fiberRoot,'----');
    
}
function markUpdateLaneFromFiberToRoot(sourceFiber:any){
    let node=sourceFiber;
    let parent=node.parent;
    while(parent){
        node=parent;
        parent=parent.parent;
    }
    return node.stateNode;
}