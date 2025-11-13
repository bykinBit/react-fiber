import { ConcurrentMode, NoMode } from './ReactTypeOfMode';
import { HostRoot, ClassComponent } from './ReactWorkTags';
import Counter from './Counter';
import { batchedUpdates } from './ReactFiberWorkLoop';
let counterInstance = new Counter() as any;
let mode = NoMode;
let rootFiber = {
    tag: HostRoot,
    updateQueue: [],
    mode
} as any;
let counterFiber = { tag: ClassComponent, updateQueue: [], mode } as any;
counterFiber.stateNode = counterInstance;
counterInstance._ReactInternal = counterFiber;
rootFiber.child = counterFiber;
counterFiber.return = rootFiber;
document.addEventListener('click', (event: any) => {
    debugger;
    let syntheticEvent = { nativeEvent: event };
    batchedUpdates(() => {
        counterInstance.handleClick(syntheticEvent)
    })
})

//1、并发渲染，不管在哪里都会进行合并
//2、
