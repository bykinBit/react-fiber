import {
    scheduleCallback, 
    shouldYield, 
    ImmediatePriority,
    UserBlockingPriority,
    NormalPriority,
    IdlePriority,
    LowPriority,
    cancelCallback,
} from "./scheduler";
let result = 0;
let i = 0;
function calculate(didTimeout: boolean) {
    for (; i < 10000000 && (!shouldYield()||didTimeout); i++) {
        result += 1;
    }
    if (i < 10000000) {
        return calculate;
    } else {
        console.log("calculate", result);
        return null;
    }
}
let result2 = 0;
let i2 = 0;
function calculate2(didTimeout: boolean) {
    for (; i2 < 10000000 && (!shouldYield()||didTimeout); i2++) {
        result2 += 1;
    }
    if (i2 < 10000000) {
        return calculate2;
    } else {
        console.log("calculate2", result2);
        return null;
    }
}
scheduleCallback(ImmediatePriority,calculate);
const task = scheduleCallback(LowPriority,calculate2,{delay:3000});
cancelCallback(task);