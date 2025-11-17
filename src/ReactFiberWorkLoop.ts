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