import { push, peek, pop } from './SchedulerMinHeap'
import { IdlePriority, ImmediatePriority, LowPriority, NoPriority, NormalPriority, UserBlockingPriority } from './SchedulerPriorities'
import { requestHostCallback, shouldYieldToHost as shouldYield, getCurrentTime, requestHostTimeout } from './SchedulerHostConfig'
let taskQueue: any[] = [];
let timerQueue: any[] = [];
let currentTask: any = null;
let taskIdCounter = 0;
const maxSigned31BitInt = 1073741823;
const IMMEDIATE_PRIORITY_TIMEOUT = -1;
const USER_BLOCKING_PRIORITY = 250;
const NORMAL_PRIORITY_TIMEOUT = 5000;
const LOW_PRIORITY_TIMEOUT = 10000;
const IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
function flushWork(currentTime: number) {
    return workLoop(currentTime);
}
function workLoop(currentTime: number) {
    // currentTask = taskQueue[0];
    currentTask = peek(taskQueue);
    while (currentTask) {
        if (currentTask.expirationTime > currentTime && shouldYield()) {
            break;
        }
        const callback = currentTask.callback;
        if (typeof callback === 'function') {
            currentTask.callback = null;
            const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
            const continuationCallback = callback(didUserCallbackTimeout);
            if (typeof continuationCallback === 'function') {
                currentTask.callback = continuationCallback;
            } else {
                pop(taskQueue);
                currentTask = null;
            }
        } else {
            pop(taskQueue);
            currentTask = null;
        }
        currentTask = peek(taskQueue);
    }
    if(currentTask){
        return true;
    }else{
        let firstTimer = peek(timerQueue);
        if(firstTimer){
            setTimeout(handleTimeout,firstTimer.startTime-currentTime);
        }
        return false;
    }
}
function scheduleCallback(priorityLevel: any, callback: any, options?: any) {
    let currentTime = getCurrentTime();
    let startTime=currentTime;
    if (typeof options === 'object' && options !== null) {
        const delay = options.delay;
        if (typeof delay === 'number' && delay > 0) {
            startTime = currentTime + delay;
        }else{
            startTime = currentTime;
        }
    }
    let timeout =0;
    switch (priorityLevel) {
        case ImmediatePriority:
            timeout = IMMEDIATE_PRIORITY_TIMEOUT;
            break;
        case UserBlockingPriority:
            timeout = USER_BLOCKING_PRIORITY;
            break;
        case NormalPriority:
            timeout = NORMAL_PRIORITY_TIMEOUT;
            break;
        case IdlePriority:
            timeout = IDLE_PRIORITY_TIMEOUT;
            break;
        case LowPriority:
            timeout = LOW_PRIORITY_TIMEOUT;
            break;
    }
    let expirationTime = startTime + timeout;
    const newTask = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime,
        expirationTime,
        sortIndex: -1,
    }
    if (startTime > currentTime) {
        newTask.sortIndex = startTime;
        push(timerQueue, newTask);
        if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
            requestHostTimeout(handleTimeout, startTime - currentTime);
        }
    } else {
        newTask.sortIndex = expirationTime;
        push(taskQueue, newTask);
        // taskQueue.push(callback);
        requestHostCallback(flushWork);
    }
    return newTask;
}
function advanceTimers(currentTime: number){
    let timer = peek(timerQueue);
    while (timer) {
        if (timer.callback === null) {
            pop(timerQueue);
        } else if (timer.startTime <= currentTime) {
            pop(timerQueue);
            timer.sortIndex = timer.expirationTime;
            push(taskQueue, timer);
        }else{
            return;
        }
        timer = peek(timerQueue);
    }
}
function handleTimeout(currentTime: number){
    advanceTimers(currentTime);
    if(peek(taskQueue)!==null){
        requestHostCallback(flushWork);
    }else{
        let firstTimer = peek(timerQueue);
        if(firstTimer){
            requestHostTimeout(handleTimeout,firstTimer.startTime-currentTime);
        }
    }
}
function cancelCallback(task: any) {
    task.callback = null;
}
export {
    scheduleCallback,
    shouldYield,
    ImmediatePriority,
    UserBlockingPriority,
    NormalPriority,
    IdlePriority,
    LowPriority,
    cancelCallback,
}