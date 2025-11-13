import {SyncLane} from './ReactFiberLane';
import {scheduleUpdateOnFiber} from './ReactFiberWorkLoop';
let classComponentUpdater={
    enqueueSetState(inst:any,payload:any){
        let fiber=get(inst);
        let eventTime=requestEventTime();
        let lane=requestUpdateLane(fiber);
        let update=createUpdate(eventTime,lane) as any;
        update.payload=payload;
        enqueueUpdate(fiber,update);
        scheduleUpdateOnFiber(fiber);
    }
}
function get(inst:any){
    return inst._ReactInternal;
}
function requestEventTime(){
    return performance.now();
}
function requestUpdateLane(fiber:any){
    return SyncLane;
}
function createUpdate(eventTime:any,lane:any):any{
    return {eventTime,lane};
}
function enqueueUpdate(fiber:any,update:any){
    fiber.updateQueue.push(update);
}
export class Component{
    public updater:any;
    constructor(){
        this.updater=classComponentUpdater;
    }
    setState(partialState:any){
        this.updater.enqueueSetState(this,partialState);
    }
}
export default Component;