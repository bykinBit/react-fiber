export let isBatchingEventUpdates=false;
export function batchedEventUpdates(fn:any,a:any,b:any){
    isBatchingEventUpdates=true;
    try {
        return fn(a,b);
    }finally{
        isBatchingEventUpdates=false;
    }
}