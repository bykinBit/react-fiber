import { getClosestInstanceFromNode, getFiberCurrentPropsFromNode } from "./ReactDomComponentTree";
import {dispatchEventForPluginEventSystem} from './DOMPluginEventSystem'
export function dispatchEvent(domEventName:string,eventSystemFlags:number,targetContainer:any,nativeEvent:any){
    let nativeEventTarget=nativeEvent.target||nativeEvent.srcElement||window;
    let targetInst=getClosestInstanceFromNode(nativeEventTarget);
    let props=getFiberCurrentPropsFromNode(nativeEventTarget);
    dispatchEventForPluginEventSystem(domEventName,eventSystemFlags,nativeEvent,targetInst,targetContainer);
}