import { appendChild } from "./ReactDOMHostConfig";
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