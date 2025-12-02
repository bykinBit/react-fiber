
let scheduledHostCallback:any = null;
let taskTimeoutId:any = null;
const channel = new MessageChannel();
channel.port1.onmessage = performWorkUntilDeadline;
let deadline = 0;
let yieldInterval = 5;
export function getCurrentTime(){
    return performance.now();
}
function performWorkUntilDeadline(){
    const currentTime = getCurrentTime();
    deadline = currentTime + yieldInterval;
    const hasMoreWork = scheduledHostCallback(currentTime);
    if(hasMoreWork){
        channel.port2.postMessage(null);
    }
}
export function requestHostCallback(callback: any) {
    scheduledHostCallback = callback;
    channel.port2.postMessage(null);
}
export function shouldYieldToHost(): boolean {
    const currentTime = getCurrentTime();
    return currentTime >= deadline;
}
export function requestHostTimeout(callback: any, delay: number) {
    taskTimeoutId = setTimeout(()=>callback(getCurrentTime()), delay);
}