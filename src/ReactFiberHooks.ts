import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'
let ReactCurrentDispatcher = { current: null } as any;
let workInProgressHook: any = null;
let currentlyRenderingFiber: any = null;
let currentHook: any = null;
const HookDispatcherOnMount = {
    useReducer: mountReducer,
    useState: mountState
}
const HookDispatcherOnUpdate = {
    useReducer: updateReducer,
    useState: updateState
}
function mountState(initialState: any) {
    let hook = mountWorkInProgressHook();
    hook.memoizedState = initialState;
    const queue = (hook.queue = {
        pending: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
    }) as any;
    const dispatch=dispatchAction.bind(null,currentlyRenderingFiber,queue);
    return [hook.memoizedState,dispatch]
}
function basicStateReducer(state: any, action: any) {
    return typeof action === 'function' ? action(state) : action;
}
export function useReducer(reducer: any, initalArg: any) {
    return ReactCurrentDispatcher.current.useReducer(reducer, initalArg)
}
export function useState(initialState: any) {
    return ReactCurrentDispatcher.current.useState(initialState);
}
function updateState(initialState: any) {
    return updateReducer(basicStateReducer, initialState);
}
function updateReducer(reducer: any, initalArg: any) {
    let hook = updateWorkInProgressHook();
    const queue = hook.queue;
    let current = currentHook;
    const pendingQueue = queue.pending;
    if (pendingQueue !== null) {
        let first = pendingQueue.next;
        let newState = current.memoizedState;
        let update = first;
        do {
            const action = update.action;
            newState = reducer(newState, action);
            update = update.next;
        } while (update !== null && update !== first);
        queue.pending = null;
        hook.memoizedState = newState;
        queue.lastRenderedState=newState;
    }
    const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue)
    return [hook.memoizedState, dispatch];
}
export function renderWithHooks(current: any, workInProgress: any, Component: any) {
    currentlyRenderingFiber = workInProgress;
    currentlyRenderingFiber.memoizedState = null;
    if (current !== null) {
        ReactCurrentDispatcher.current = HookDispatcherOnUpdate;
    } else {
        ReactCurrentDispatcher.current = HookDispatcherOnMount;
    }
    let children = Component();
    currentlyRenderingFiber = null;
    workInProgress = null;
    currentHook = null;
    return children;
}
function mountReducer(reducer: any, initalArg: any) {
    //构建hooks的单向列表
    let hook = mountWorkInProgressHook();
    hook.memoizedState = initalArg;
    const queue = (hook.queue = { pending: null } as any);//更新队列
    const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue)
    return [hook.memoizedState, dispatch];
}
function dispatchAction(currentlyRenderingFiber: any, queue: any, action: any) {
    const update = { action, next: null } as any;
    const pending = queue.pending;
    if (pending === null) {
        update.next = update;
    } else {
        update.next = pending.next;
        pending.next = update;
    }
    queue.pending = update;
    console.log('queue pending', queue.pending);
    let lastRenderedReducer=queue.lastRenderedReducer;
    let lastRenderedState=queue.lastRenderedState;
    const eagerState=lastRenderedReducer(lastRenderedState,action);
    update.eagerState=eagerState;
    update.eagerReducer=lastRenderedReducer;
    if(Object.is(eagerState,lastRenderedState)){
        return;
    }
    scheduleUpdateOnFiber(currentlyRenderingFiber)
}
function mountWorkInProgressHook() {
    let hook = {
        memoizedState: null,
        queue: null,
        next: null
    } as any;
    if (workInProgressHook === null) {
        currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    } else {
        workInProgressHook = workInProgressHook.next = hook;
    }
    return workInProgressHook;
}
function updateWorkInProgressHook() {
    let nextCurrentHook: any = null;
    if (currentHook === null) {
        let current = currentlyRenderingFiber.alternate;
        nextCurrentHook = current.memoizedState;
    } else {
        nextCurrentHook = currentHook.next;
    }
    currentHook = nextCurrentHook;

    const newHook = {
        memoizedState: currentHook.memoizedState,
        queue: currentHook.queue,
        next: null
    } as any;
    if (workInProgressHook === null) {
        currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
        workInProgressHook = workInProgressHook.next = newHook;
    }
    return workInProgressHook;

}