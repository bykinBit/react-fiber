let ReactCurrentDispatcher={current:null} as any;
let workInProgressHook:any=null;
let currentlyRenderingFiber:any=null;
const HookDispatcherOnMount={
    useReducer:mountReducer
}
export function useReducer(reducer:any,initalArg:any){
    return ReactCurrentDispatcher.current.useReducer(reducer,initalArg)

}
export function renderWithHooks(current:any,workInProgress:any,Component:any){
    currentlyRenderingFiber=workInProgress;
    ReactCurrentDispatcher.current=HookDispatcherOnMount;
    let children=Component();
    currentlyRenderingFiber=null;
    workInProgress=null;
    return children;
}
function mountReducer(reducer:any,initalArg:any){
    //构建hooks的单向列表
    let hook=mountWorkInProgressHook();
    hook.memoizedState=initalArg;
    const queue=(hook.queue={pending:null} as any);//更新队列
    const dispatch=dispatchAction.bind(null,currentlyRenderingFiber,queue)
    return [hook.memoizedState,dispatch];
}
function dispatchAction(currentlyRenderingFiber:any,queue:any,action:any){
    const update={action,next:null} as any;
    const pending=queue.pending;
    if(pending===null){
        update.next=update;
    }else{
        update.next=pending.next;
        pending.next=update;
    }
    queue.pending=update;
    console.log('queue pending',queue.pending);
    
}
function mountWorkInProgressHook(){
    let hook={
        memoizedState:null,
        queue:null,
        next:null
    } as any;
    if(workInProgressHook===null){
        currentlyRenderingFiber.memoizedState=workInProgressHook=hook;
    }else{
        workInProgressHook=workInProgressHook.next=hook;
    }
    return workInProgressHook;
}