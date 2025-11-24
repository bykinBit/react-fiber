
export function initializeUpdateQueue(fiber:any){
    const updateQueue={
        shared:{
            pending:null
        } as any
    }
    fiber.updateQueue=updateQueue;
}
export function createUpdate(){
    return {} as any;
}
export function enqueueUpdate(fiber:any,update:any){
    let updateQueue=fiber.updateQueue;
    const sharedQueue=updateQueue.shared;
    const pending=sharedQueue.pending;
    if(!pending){
        update.next=update;
    }else{
        update.next=pending.next;
        pending.next=update;
    }
    sharedQueue.pending=update;
}