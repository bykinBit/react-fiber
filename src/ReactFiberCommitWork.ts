import { updateProperties } from "./ReactDOMComponent";
import { appendChild, removeChild } from "./ReactDOMHostConfig";
import { HostComponent, HostRoot } from "./ReactWorkTags";

function getParentStateNode(fiber:any){
    let parent=fiber.return;
    do{
        if(parent.tag===HostComponent){
            return parent.stateNode;
        }else if(parent.tag===HostRoot){
            return parent.stateNode.containerInfo
        }else{
            parent=parent.return;
        }
    }while(parent);
}

export function commitPlacement(nextEffect:any){
    let stateNode=nextEffect.stateNode;
    let parentStateNode=getParentStateNode(nextEffect);
    appendChild(parentStateNode,stateNode);
}
export function commitWork(current:any,finishedWork:any){
    const updatePayload=finishedWork.updateQueue;
    finishedWork.updateQueue=null;
    if(updatePayload){
        updateProperties(current.stateNode,updatePayload)
    }
}
export function commitDeletion(fiber:any){
    if(!fiber){
        return;
    }
    let parentStateNode=getParentStateNode(fiber.nextEffect);
    removeChild(parentStateNode,fiber.stateNode)
}