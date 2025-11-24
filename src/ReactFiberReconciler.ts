import { createUpdate, enqueueUpdate } from './ReactUpdateQueue';
import {scheduleUpdateOnFiber} from './ReactFiberWorkLoop'
export function updateContainer(element: any, container: any) {
    const current = container.current;
    const update = createUpdate();
    update.payload = { element };
    enqueueUpdate(current, update);
    scheduleUpdateOnFiber(current);
}