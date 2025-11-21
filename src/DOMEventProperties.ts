import {registerTwoPhaseEvent} from './EventRegistry'
const discreteEventPairsForSimpleEventPlugin=[
    'click','click','dbclick','doubleClick'
]
export const topLevelEventsToReactNames=new Map();
export function registerSimpleEvents(){
    for(let i=0;i<discreteEventPairsForSimpleEventPlugin.length;i+=2){
        let topEvent=discreteEventPairsForSimpleEventPlugin[i];
        const event=discreteEventPairsForSimpleEventPlugin[i+1];
        const capitalizedEvent=event[0].toUpperCase()+event.slice(1);
        const reactName='on'+capitalizedEvent;
        topLevelEventsToReactNames.set(topEvent,reactName);
        registerTwoPhaseEvent(reactName,[topEvent]);
    }
}