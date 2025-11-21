export function addEventBubbleListener(target:any,eventType:any,listener:any){
    target.addEventListener(eventType,listener,false);
}
export function addEventCaptureListener(target:any,eventType:any,listener:any){
    target.addEventListener(eventType,listener,true);
}