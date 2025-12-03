import {SyncLane,SyncBatchedLane} from './ReactFiberLane'
import {initializeUpdateQueue,enqueueUpdate,processUpdateQueue} from './ReactUpdateQueue'

const fiber={memoizedState:{msg:''}} as any;

initializeUpdateQueue(fiber)

let update1={name:'update1',payload:(state:any)=>({msg:state.msg+'A'} as any),lane:SyncBatchedLane}
enqueueUpdate(fiber,update1)
let update2={name:'update2',payload:(state:any)=>({msg:state.msg+'B'} as any),lane:SyncLane}
enqueueUpdate(fiber,update2)
let update3={name:'update3',payload:(state:any)=>({msg:state.msg+'C'} as any),lane:SyncBatchedLane}
enqueueUpdate(fiber,update3)
let update4={name:'update4',payload:(state:any)=>({msg:state.msg+'D'} as any),lane:SyncLane}
enqueueUpdate(fiber,update4)
processUpdateQueue(fiber,SyncLane);
console.log(fiber.memoizedState);
let update5={name:'update5',payload:(state:any)=>({msg:state.msg+'E'} as any),lane:SyncLane}
enqueueUpdate(fiber,update5)
processUpdateQueue(fiber,SyncLane);
console.log(fiber.memoizedState);
let update6={name:'update6',payload:(state:any)=>({msg:state.msg+'F'} as any),lane:SyncLane}
enqueueUpdate(fiber,update6)
processUpdateQueue(fiber,SyncLane);
console.log(fiber.memoizedState);

// function outputQueue(updateQueue:any){
//     let lastUpdate=updateQueue.shared.pending;
//     let firstUpdate=lastUpdate.next;
//     let str='';
//     do{
//         str=str+firstUpdate.name+'=>';
//         firstUpdate=firstUpdate.next;
//     }while(firstUpdate&&lastUpdate!==firstUpdate);
//     str=str+lastUpdate.name;
//     console.log(str);
    
// }
// outputQueue(fiber.updateQueue)