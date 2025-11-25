import { Placement } from "./ReactFiberFlags";
import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
import { createFiberFromElement } from './ReactFiber';

function childReconciler(shouldTrackSideEffects: boolean) {
    function reconcilSingleElement(returnFiber: any, currentFirstChild: any, element: any) {
        const created = createFiberFromElement(element);
        created.return = returnFiber;
        return created;
    }
    function placeSingleChild(newFiber: any) {
        if (shouldTrackSideEffects && !newFiber.alternate) {
            newFiber.flags = Placement;
        }
        return newFiber;
    }
    function reconcileChildFibers(returnFiber: any, currentFirstChild: any, newChild: any) {
        const isObject = typeof newChild === 'object' && (newChild);
        if (isObject) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcilSingleElement(returnFiber, currentFirstChild, newChild));
            }
        }
    }

    return reconcileChildFibers;
}

export const reconcileChildFibers = childReconciler(true);
export const mountChildFibers = childReconciler(false);