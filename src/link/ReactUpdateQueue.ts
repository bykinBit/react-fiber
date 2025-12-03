import { isSubsetOfLanes, mergeLanes, NoLanes } from "./ReactFiberLane";

export function initializeUpdateQueue(fiber:any){
    const queue={
        baseState:fiber.memoizedState,
        firstBaseUpdate:null,
        lastBaseUpdate:null,
        shared:{
            pending:null
        },
    } as any;
    fiber.updateQueue=queue;
}
export function enqueueUpdate(fiber:any,update:any){
    const updateQueue=fiber.updateQueue;
    const sharedQueue=updateQueue.shared;
    const pending=sharedQueue.pending;
    if(pending===null){
        update.next=update;
    }else{
        update.next=pending.next;
        pending.next=update;
    }
    sharedQueue.pending=update;
}

export function processUpdateQueue(fiber:any,renderLanes:number){
    const queue=fiber.updateQueue;
    let firstBaseUpdate=queue.firstBaseUpdate;
    let lastBaseUpdate=queue.lastBaseUpdate;
    const pendingQueue=queue.shared.pending;
    if(pendingQueue!==null){
        queue.shared.pending=null;
        const lastPendingUpdate=pendingQueue;
        const firstPendingUpdate=lastPendingUpdate.next;
        lastPendingUpdate.next=null;
        if(lastBaseUpdate===null){
            firstBaseUpdate=firstPendingUpdate;
        }else{
            lastBaseUpdate.next=firstPendingUpdate;

        }
        lastBaseUpdate=lastPendingUpdate;
    }
    if(firstBaseUpdate!==null){
        let newState=queue.baseState;
        let newLanes=NoLanes;
        let newBaseState=null as any;
        let newFirstBaseUpdate=null as any;
        let newLastBaseUpdate=null as any;
        let update=firstBaseUpdate;
        do{
            const updateLane=update.lane;
            if(!isSubsetOfLanes(renderLanes,updateLane)){
                const clone={
                    lane:updateLane,
                    payload:update.payload,
                }
                if(newLastBaseUpdate===null){
                    newFirstBaseUpdate=newLastBaseUpdate=clone;
                    newBaseState=newState;
                }else{
                    newLastBaseUpdate=newLastBaseUpdate.next=clone;
                }
                newLanes=mergeLanes(newLanes,updateLane);
            }else{
                if(newLastBaseUpdate!==null){
                    const clone={
                        lane:updateLane,
                        payload:update.payload,
                    }
                    newLastBaseUpdate=newLastBaseUpdate.next=clone;
                }
                newState=getStateFromUpdate(update,newState);
            }
            update=update.next;
        }while(update);
        if(!newLastBaseUpdate){
            newBaseState=newState;
        }
        queue.baseState=newBaseState;
        queue.firstBaseUpdate=newFirstBaseUpdate;
        queue.lastBaseUpdate=newLastBaseUpdate;
        fiber.lanes=newLanes;
        fiber.memoizedState=newState;
    }
}
function getStateFromUpdate(update:any,state:any){
    const payload=update.payload;
    let newState=payload(state);
    return newState;
}