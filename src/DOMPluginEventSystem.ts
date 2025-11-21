import { allNativeEvents } from "./EventRegistry";
import * as SimpleEventPlugin from './SimpleEventPlugin'
import {getEventListenerSet} from './ReactDomComponentTree'
import {IS_CAPTURE_PHASE} from './EventSystemFlags'
import { addEventBubbleListener, addEventCaptureListener } from "./EventListener";
import {dispatchEvent} from './ReactDOMEventListener'
import { HostComponent } from "./ReactWorkTags";
import getListener from './getListener'
SimpleEventPlugin.registerEvents()
export const nonDelegatedEvents=new Set('scroll');
export function listenToAllSupportedEvents(container:any){
    allNativeEvents.forEach((domEventName:any)=>{
        console.log('domEventName',domEventName);
        if(!nonDelegatedEvents.has(domEventName)){
            listenToNativeEvent(domEventName,false,container);
        }
        listenToNativeEvent(domEventName,true,container);
    })
}
function listenToNativeEvent(domEventName:string,isCapturePhaseListener:boolean,rootContainerElement:Element,eventSystemFlags=0){
    let listenerSet=getEventListenerSet(rootContainerElement);
    let listenerSetKey=getListenerSetKey(domEventName,isCapturePhaseListener);
    if(!listenerSet.has(listenerSetKey)){
        if(isCapturePhaseListener){
            eventSystemFlags|=IS_CAPTURE_PHASE;
        }
        addTrappedEventListener(rootContainerElement,domEventName,eventSystemFlags,isCapturePhaseListener);
        listenerSet.add(listenerSetKey);
    }
}
function getListenerSetKey(domEventName:string,isCapturePhaseListener:boolean){
    return `${domEventName}__${isCapturePhaseListener?'capture':'bubble'}`
}
function addTrappedEventListener(rootContainerElement:any,domEventName:string,eventSystemFlags:number,isCapturePhaseListener:boolean){
    let listener=dispatchEvent.bind(null,domEventName,eventSystemFlags,rootContainerElement);
    if(isCapturePhaseListener){
        addEventCaptureListener(rootContainerElement,domEventName,listener);
    }else{
        addEventBubbleListener(rootContainerElement,domEventName,listener);
    }
}
function processDispatchQueue(dispatchQueue:Array<any>,eventSystemFlags:any){
    let isCapturePhase=(eventSystemFlags&IS_CAPTURE_PHASE)!==0;
    for(let i=0;i<dispatchQueue.length;i++){
        const {event,listeners}=dispatchQueue[i];
        processDispatchQueueItemsInOrder(event,listeners,isCapturePhase);
    }
}
function processDispatchQueueItemsInOrder(event:any,listeners:Array<any>,isCapturePhase:boolean){
    if(isCapturePhase){
        for(let i=listeners.length-1;i>=0;i--){
            const {currentTarget,listener}=listeners[i];
            if(event.isPropagationStoped()){
                return;
            }
            execDispatch(event,listener,currentTarget);
        }
    }else{
        for(let i=0;i<listeners.length;i++){
            const {currentTarget,listener}=listeners[i];
            if(event.isPropagationStoped()){
                return;
            }
            execDispatch(event,listener,currentTarget);
        }
    }
}
function execDispatch(event:any,listener:any,currentTarget:any){
    event.currentTarget=currentTarget;
    listener(event);
    event.currentTarget=null;
}
export function dispatchEventForPluginEventSystem(domEventName:any,eventSystemFlags:number,nativeEvent:any,targetInst:any,targetContainer:any){
    let nativeEventTarget=nativeEvent.target;
    let dispatchQueue=[] as any;
    SimpleEventPlugin.extractEvent(dispatchQueue,domEventName,targetInst,nativeEvent,nativeEventTarget,eventSystemFlags,targetContainer)
    
    processDispatchQueue(dispatchQueue,eventSystemFlags);
}
export function accumulateSinglePhaseListeners(targetFiber:any,reactName:string,nativeEventType:any,inCapturePhase:boolean){
    let captureName=reactName+'Capture';
    let reactEventName=inCapturePhase?captureName:reactName;
    const listeners=[];
    let instance=targetFiber;
    let lastHostComponent=null;
    while(instance){
        const {stateNode,tag}=instance;
        if(tag===HostComponent&&stateNode!==null){
            lastHostComponent=stateNode;
            if(reactEventName!==null){
                const listener=getListener(instance,reactEventName);
                if(listener){
                    listeners.push(createDispatchListener(instance,listener,lastHostComponent))
                }
            }
        }
        instance=instance.return;
    }
    return listeners;
}
function createDispatchListener(instance:any,listener:any,currentTarget:any){
    return {instance,listener,currentTarget}
}