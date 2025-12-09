import { updateQueue } from "./Component";
export function addEvent(dom: any, eventType: any, handler: any) {
    let store = dom.store || (dom.store = {})
    store[eventType.toLowerCase()] = handler;
    const eventName = eventType.toLowerCase();
    const nativeName = eventName.replace(/Capture$/, '').slice(2);
    const docWithFlags = document as Document & Record<string, boolean>;
    if (!docWithFlags[nativeName]) {
        document.addEventListener(eventName.slice(2).toLowerCase(), () => {
            dispatchEvent(event, true)
        }, true);
        document.addEventListener(eventName.slice(2).toLowerCase(), () => {
            dispatchEvent(event, false)
        }, false);
        // (document as any)[eventType.toLowerCase] = dispatchEvent;
        docWithFlags[nativeName] = true;
    }
}



function dispatchEvent(event: any, isCapture: boolean) {
    const { target, type } = event;
    let eventType = `on${type}`;
    let eventTypeCapture = `on${type}capture`;
    let syntheticEvent = createSyntheticEvent(event);
    // let currentTarget = event.currentTarget;
    updateQueue.isBatchingUpdate = true;
    let targetStack = [];
    let currentTarget = target;
    while (currentTarget) {
        targetStack.push(currentTarget);
        currentTarget = currentTarget.parentNode;
    }
    if (isCapture) {
        for (let i = targetStack.length - 1; i >= 0; i--) {
            const currentTargetCapture = targetStack[i];
            let { store } = currentTargetCapture;
            let handler = store && store[eventTypeCapture];
            if (handler) {
                handler(syntheticEvent);
            }
        }
    } else {
        for (let i = 0; i < targetStack.length; i++) {
            const currentTargetClick = targetStack[i];
            let { store } = currentTargetClick;
            let handler = store && store[eventType];
            if (handler) {
                handler(syntheticEvent);
                if(syntheticEvent.isPropagationStopped){
                    break;
                }
            }
        }
    }
    updateQueue.batchUpdate();


}

function createSyntheticEvent(nativeEvent: any) {
    let syntheticEvent = {} as any;
    for (let key in nativeEvent) {
        let value = nativeEvent[key];
        if (typeof value === 'function') {
            value = value.bind(nativeEvent);
        }
        syntheticEvent[key] = value;
    }
    syntheticEvent.nativeEvent = nativeEvent;
    syntheticEvent.isDefaultPrevented = false;
    syntheticEvent.preventDefault = preventDefault;
    syntheticEvent.isPropagationStopped=false;
    syntheticEvent.stopPropagation=stopPropagation;
    return syntheticEvent;
}
function preventDefault() {
    this.isDefaultPrevented=true;
    const nativeEvent=this.nativeEvent;
    if(nativeEvent.preventDefault){
        nativeEvent.preventDefault();
    }else{
        nativeEvent.returnValue=false;
    }
}
function stopPropagation(){
    this.isPropagationStopped=true;
    const nativeEvent=this.nativeEvent;
    if(nativeEvent.stopPropagation){
        nativeEvent.stopPropagation();
    }else{
        nativeEvent.cancelBubble=true;
    }
}
