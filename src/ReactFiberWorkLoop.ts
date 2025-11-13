import {ClassComponent, HostRoot} from './ReactWorkTags';
import {SyncLane} from './ReactFiberLane';
import { ConcurrentMode, NoMode } from './ReactTypeOfMode';
const SyncLanePriority=12;
const NoLanePriority=0;
let syncQueue:any[]=[];
let NoContext=0;
let BatchedContext=1;
let executionContext=NoContext;
export function scheduleUpdateOnFiber(fiber:any){
    let root=markUpdateFromFiberToRoot(fiber);
    if(root){
        ensureRootIsScheduled(root);
    }
    if(executionContext===NoContext&&(fiber.mode&ConcurrentMode)===NoMode){
        flushSyncCallbacks()
    }
}
export function batchedUpdates(fn:any){
    let prevExecutionContext=executionContext;
    executionContext|=BatchedContext;
    fn()
    executionContext=prevExecutionContext
}
function markUpdateFromFiberToRoot(fiber:any){
    let node=fiber;
    while(node){
        if(node.tag===HostRoot){
            return node;
        }
        node=node.return;
    }
    return null;
}
function ensureRootIsScheduled(root:any){
    let nextLanes=SyncLane;
    let newCallbackPriority=SyncLanePriority;
    let existingCallbackPriority=root.callbackPriority;
    if(existingCallbackPriority===newCallbackPriority){
        return;
    }
    scheduleSyncCallback(performSyncWorkOnRoot.bind(null,root));
    queueMicrotask(flushSyncCallbacks);
    root.callbackPriority=newCallbackPriority;
}
function flushSyncCallbacks(){
    syncQueue.forEach(callback=>callback());
    syncQueue.length=0;
}
function scheduleSyncCallback(callback:any){
    syncQueue.push(callback);
}
function performSyncWorkOnRoot(workInProgress:any){
    let root=workInProgress;
    console.log('开始执行调和任务');
    while(workInProgress){
        if(workInProgress.tag===ClassComponent){
            let instance=workInProgress.stateNode;
            instance.state=processUpdateQueue(instance,workInProgress);
            instance.render();
        }
        workInProgress=workInProgress.child;
    }
    commitRoot(root);
}
function commitRoot(root:any){
    console.log('开始提交根节点');
    root.callbackPriority=NoLanePriority;

}
function processUpdateQueue(inst:any,fiber:any){
    return fiber.updateQueue.reduce((state:any,{payload}:any)=>{
        if(typeof payload==='function'){
            return payload(state);
        }
        return {...state,...payload};
    },inst.state)
}
