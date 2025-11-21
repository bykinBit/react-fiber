export const allNativeEvents=new Set();
function registerDirectEvent(registrationName:string,dependencies:any){
    for(let i=0;i<dependencies.length;i++){
        allNativeEvents.add(dependencies[i])
    }
}
export function registerTwoPhaseEvent(registrationName:any,dependencies:any){
    registerDirectEvent(registrationName,dependencies);
    registerDirectEvent(registrationName+'Capture',dependencies)
}