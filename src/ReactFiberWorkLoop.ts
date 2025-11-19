import {beginWork} from './ReactFiberBeginWork'
let workInProgress:any=null;
function performUnitOfWork(unitOfWork:any){
    let current =unitOfWork.alternate;
    return beginWork(current,unitOfWork);
}
function workLoop(){
    while(workInProgress!==null){
        workInProgress=performUnitOfWork(workInProgress);
    }
}
export function render(fiber:any){
    workInProgress=fiber;
    workLoop();
}
//正常从当前阶段找到根节点
export function scheduleUpdateOnFiber(fiber:any){
    let newFiber={
        ...fiber,
        alternate:fiber
    }
    workInProgress=newFiber
    workLoop()
}