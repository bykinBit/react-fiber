import { topLevelEventsToReactNames } from './DOMEventProperties';
import {registerSimpleEvents} from './DOMEventProperties'
import { accumulateSinglePhaseListeners } from './DOMPluginEventSystem';
import { IS_CAPTURE_PHASE } from './EventSystemFlags';
import { SyntheticMouseEvent,SyntheticEvent } from './SyntheticEvent';

const dispatchQueue=[];
function extractEvent(dispatchQueue:any,domEventName:any,targetInst:any,nativeEvent:any,nativeEventTarget:any,eventSystemFlags:any,targetContainer:any){
    let reactName=topLevelEventsToReactNames.get(domEventName);
    let SyntheticEventCtor:any=SyntheticEvent;
    let reactEventType=domEventName;
    if(!reactName){
        return;
    }
    switch(domEventName){
        case 'click':
            SyntheticEventCtor=SyntheticMouseEvent;
            break;
        default:
            break;
    }
    let inCapturePhase=(eventSystemFlags&IS_CAPTURE_PHASE)!==0;
    const listeners=accumulateSinglePhaseListeners(targetInst,reactName,nativeEvent.type,inCapturePhase);
    if(listeners.length>0){
        const event=new SyntheticEventCtor(reactName,reactEventType,targetInst,nativeEvent,nativeEventTarget);
        dispatchQueue.push({event,listeners})
    }
}

export {registerSimpleEvents as registerEvents,extractEvent}