import { createHostRootFiber } from './ReactFiber';
import { initializeUpdateQueue } from './ReactUpdateQueue';
export function createFiberRoot(containerInfo: any) {
    const fiberRoot = { containerInfo } as any;
    const hostRootFiber = createHostRootFiber();
    fiberRoot.current = hostRootFiber;
    hostRootFiber.stateNode = fiberRoot;
    initializeUpdateQueue(hostRootFiber);
    return fiberRoot;
}